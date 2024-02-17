export default async function PlanUpgradeButton() {
  return (
    <button className="items-center h-[40px] tracking-wide disabled:cursor-not-allowed disabled:border-border rounded-full text-white border border-blue-600 focus:outline-0 text-sm flex justify-center py-2 px-3 transition-colors bg-blue-600 hover:bg-blue-700 disabled:bg-blue-700 active:bg-blue-700">
      Upgrade
    </button>
  );
}
