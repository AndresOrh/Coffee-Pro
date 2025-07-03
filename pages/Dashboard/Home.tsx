import WidgetCard from "../../components/dashComponents/WidgetCard.tsx";
import MonthlySalesChart from "../../components/dashComponents/MonthlySalesChart";
import StatisticsChart from "../../components/dashComponents/StatisticsChart";
import MonthlyTarget from "../../components/dashComponents/MonthlyTarget";
import RecentOrders from "../../components/dashComponents/RecentOrders";
import PageMeta from "../../components/common/PageMeta";
import SiloTables from "../../components/tables/BasicTables/SiloTable.tsx";
import CycleTables from "../../components/tables/BasicTables/CycleTable.tsx";
import CompanyTable from "../../components/tables/BasicTables/CompanyTable.tsx";
import GroupTable from "../../components/tables/BasicTables/GroupsTable.tsx";
import ComponentCard from "../../components/common/ComponentCard.tsx";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Dashboard"
        description="Coffee Pro Dashboard"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">

          <div className="col-span-12">
              <ComponentCard title="Silos de Fermentación">
                  <SiloTables />
              </ComponentCard>
          </div>

          <div className="col-span-12">
              <ComponentCard title="Ciclos de Fermentación">
                  <CycleTables />
              </ComponentCard>

          </div>

          <div className="col-span-12">
              <ComponentCard title="Grupos de Fermentación">
                  <GroupTable />
              </ComponentCard>
          </div>

          <div className="col-span-12">
              <ComponentCard title="Empresas">
                  <CompanyTable />
              </ComponentCard>
          </div>

          <div className="col-span-12 space-y-6 xl:col-span-7">
              <WidgetCard />

              <MonthlySalesChart />
          </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>


        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
