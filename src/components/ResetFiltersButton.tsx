export function ResetFiltersButton({
    onResetFilters,
}: {
    onResetFilters: () => void;
}) {
    return (
        <button
            onClick={onResetFilters}
            className="block text-center mt-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-semibold w-full"
        >
            🔄 Réinitialiser les filtres
        </button>
    );
}
