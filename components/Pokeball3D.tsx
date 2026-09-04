"use client";

import { type PointerEvent, useEffect, useRef, useState } from "react";

/** Matches the flat illustration the PNG used, so the fallback swap is not jarring. */
const COLOR_SHELL_TOP = 0xef3f2a;
const COLOR_SHELL_BOTTOM = 0xf7f9fa;
const COLOR_TRIM = 0x37474f;

const RADIUS = 1;
/** Half the angular height of the dark equator band, in radians. */
const BAND_HALF_ANGLE = 0.06;

const SPIN_SPEED = 0.6; // radians per second when idle
const DAMPING = 6; // how quickly rotation eases toward its target
const MAX_TILT_X = 0.55;
const MAX_TILT_Y = 0.95;

const TAU = Math.PI * 2;
const BASE_TILT_X = 0.18;

/** Wraps an angle into (-PI, PI] so easing takes the short way round. */
function normalizeAngle(angle: number): number {
  return ((((angle + Math.PI) % TAU) + TAU) % TAU) - Math.PI;
}

export default function Pokeball3D({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    // Dynamic import keeps three out of the initial page bundle; the still
    // image below carries the hero until this chunk arrives.
    void import("three")
      .then((THREE) => {
        if (disposed) return;

        let renderer: import("three").WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
          });
        } catch {
          setFailed(true);
          return;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          38,
          container.clientWidth / Math.max(container.clientHeight, 1),
          0.1,
          100,
        );
        camera.position.set(0, 0, 4.2);

        scene.add(new THREE.AmbientLight(0xffffff, 1.4));
        const key = new THREE.DirectionalLight(0xffffff, 2.4);
        key.position.set(3, 4, 5);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xbcd4ff, 1.1);
        rim.position.set(-4, -2, -3);
        scene.add(rim);

        const ball = new THREE.Group();
        scene.add(ball);

        // Tracked so the unmount path can free every GPU resource.
        const geometries: import("three").BufferGeometry[] = [];
        const materials: import("three").Material[] = [];

        const shell = (color: number) =>
          new THREE.MeshStandardMaterial({
            color,
            roughness: 0.32,
            metalness: 0.04,
          });

        const topMaterial = shell(COLOR_SHELL_TOP);
        const bottomMaterial = shell(COLOR_SHELL_BOTTOM);
        const trimMaterial = shell(COLOR_TRIM);
        materials.push(topMaterial, bottomMaterial, trimMaterial);

        const capHeight = Math.PI / 2 - BAND_HALF_ANGLE;
        const topGeometry = new THREE.SphereGeometry(
          RADIUS,
          64,
          32,
          0,
          TAU,
          0,
          capHeight,
        );
        const bottomGeometry = new THREE.SphereGeometry(
          RADIUS,
          64,
          32,
          0,
          TAU,
          Math.PI / 2 + BAND_HALF_ANGLE,
          capHeight,
        );
        // Sits fractionally proud of the shell so it never z-fights the caps.
        const bandGeometry = new THREE.SphereGeometry(
          RADIUS * 1.003,
          64,
          8,
          0,
          TAU,
          Math.PI / 2 - BAND_HALF_ANGLE,
          BAND_HALF_ANGLE * 2,
        );
        geometries.push(topGeometry, bottomGeometry, bandGeometry);

        ball.add(new THREE.Mesh(topGeometry, topMaterial));
        ball.add(new THREE.Mesh(bottomGeometry, bottomMaterial));
        ball.add(new THREE.Mesh(bandGeometry, trimMaterial));

        // Inverted, slightly larger shell: the dark outline from the artwork.
        const outlineGeometry = new THREE.SphereGeometry(
          RADIUS * 1.045,
          48,
          32,
        );
        const outlineMaterial = new THREE.MeshBasicMaterial({
          color: COLOR_TRIM,
          side: THREE.BackSide,
        });
        geometries.push(outlineGeometry);
        materials.push(outlineMaterial);
        ball.add(new THREE.Mesh(outlineGeometry, outlineMaterial));

        // Front button: dark ring, white face, dark centre, each proud of the last.
        const button: [number, number, number, import("three").Material][] = [
          [0.26, 0.14, 0.95, trimMaterial],
          [0.185, 0.14, 0.975, bottomMaterial],
          [0.075, 0.14, 1.0, trimMaterial],
        ];
        for (const [buttonRadius, height, z, material] of button) {
          const geometry = new THREE.CylinderGeometry(
            buttonRadius,
            buttonRadius,
            height,
            48,
          );
          geometries.push(geometry);
          const mesh = new THREE.Mesh(geometry, material);
          mesh.rotation.x = Math.PI / 2; // cylinders default to a Y axis
          mesh.position.z = z;
          ball.add(mesh);
        }

        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        let spin = 0;
        let currentX = BASE_TILT_X;
        let currentY = 0;
        let wasHovered = false;
        let last = performance.now();

        const resize = () => {
          const width = container.clientWidth;
          const height = Math.max(container.clientHeight, 1);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };
        const observer = new ResizeObserver(resize);
        observer.observe(container);

        renderer.setAnimationLoop(() => {
          const now = performance.now();
          const delta = Math.min((now - last) / 1000, 0.1);
          last = now;

          const hovered = hoveredRef.current;

          // Idle spin accumulates without bound. Rewinding it a full turn is
          // invisible, and keeps the value from drifting over a long session.
          if (!hovered && spin > TAU) {
            spin -= TAU;
            currentY -= TAU;
          }

          // On the first hovered frame, fold the accumulated spin back into
          // (-PI, PI] so easing toward the pointer takes the short way round
          // instead of unwinding every turn it has made.
          if (hovered && !wasHovered) currentY = normalizeAngle(currentY);
          wasHovered = hovered;

          let targetX = BASE_TILT_X;
          let targetY: number;

          if (hovered) {
            // Hold the spin where it is so releasing the pointer resumes smoothly.
            spin = currentY;
            targetY = pointerRef.current.x * MAX_TILT_Y;
            targetX = BASE_TILT_X + pointerRef.current.y * MAX_TILT_X;
          } else {
            if (!reducedMotion) spin += SPIN_SPEED * delta;
            targetY = spin;
          }

          const ease = 1 - Math.exp(-DAMPING * delta);
          currentX += (targetX - currentX) * ease;
          currentY += (targetY - currentY) * ease;

          ball.rotation.x = currentX;
          ball.rotation.y = currentY;

          const targetScale = hoveredRef.current ? 1.06 : 1;
          ball.scale.setScalar(
            ball.scale.x + (targetScale - ball.scale.x) * ease,
          );

          renderer.render(scene, camera);
        });

        setReady(true);

        cleanup = () => {
          renderer.setAnimationLoop(null);
          observer.disconnect();
          for (const geometry of geometries) geometry.dispose();
          for (const material of materials) material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {
        if (!disposed) setFailed(true);
      });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  const handleEnter = () => {
    hoveredRef.current = true;
  };

  const handleLeave = () => {
    hoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
  };

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      y: ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
    };
  };

  return (
    <div
      ref={containerRef}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onPointerMove={handleMove}
      role="img"
      aria-label="A slowly spinning Poké Ball. Hover to turn it with the pointer."
      className={`relative touch-none ${className}`}
    >
      {/* Holds the layout and stands in if WebGL is unavailable. */}
      {(!ready || failed) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/pokeball.png"
          alt=""
          className="absolute inset-0 h-full w-full object-contain drop-shadow-xl"
        />
      )}
    </div>
  );
}
