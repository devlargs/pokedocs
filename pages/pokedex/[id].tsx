const PokemonById = () => (
  <div className="bg-white shadow p-4 rounded lg:w-64">
    <div className="text-center mt-4">
      <p className="text-gray-600 font-bold">Squirtle</p>
      <p className="text-sm font-hairline text-gray-600 mt-1">#4</p>
    </div>
    <div className="flex justify-center mt-4">
      <img
        className="shadow sm:w-12 sm:h-12 w-10 h-10 rounded-full"
        src="https://cdn.bulbagarden.net/upload/thumb/3/39/007Squirtle.png/250px-007Squirtle.png"
        alt="Avatar"
      />
    </div>
    <div className="mt-6 flex justify-between text-center">
      <div>
        <p className="text-gray-700 font-bold">20</p>
        <p className="text-xs mt-2 text-gray-600 font-hairline">Attack</p>
      </div>
      <div>
        <p className="text-gray-700 font-bold">99k</p>
        <p className="text-xs mt-2 text-gray-600 font-hairline">Moves</p>
      </div>
      <div>
        <p className="text-gray-700 font-bold">530</p>
        <p className="text-xs mt-2 text-gray-700 font-hairline">Damage</p>
      </div>
    </div>
  </div>
);

export default PokemonById;
