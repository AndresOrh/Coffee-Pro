import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import ManageCycle from "./pages/Tables/ManageCycle.tsx";
import FormElements from "./pages/Forms/FormElements";
import FormSilos from "./pages/Forms/FormSilos";
import FormCiclos from "./pages/Forms/FormCiclos";
import FormParametros from "./pages/Forms/FormParametros";
import FormGrupos from "./pages/Forms/FormGrupos";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ManageSilo from "./pages/Tables/ManageSilo.tsx";
import ManageParameter from "./pages/Tables/ManageParameter.tsx";
import ManageGroups from "./pages/Tables/ManageGroups.tsx";
import FormEmpresas from "./pages/Forms/FormEmpresas.tsx";
import ManageCompanies from "./pages/Tables/ManageCompanies.tsx";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/form-silos" element={<FormSilos />} />
            <Route path="/form-ciclos" element={<FormCiclos />} />
            <Route path="/form-grupos" element={<FormGrupos />} />
            <Route path="/form-parametros" element={<FormParametros />} />
            <Route path="/form-empresas" element={<FormEmpresas />} />



            {/* Tables */}
            <Route path="/manage-cycles" element={<ManageCycle />} />
            <Route path="/manage-groups" element={<ManageGroups />} />
            <Route path="/manage-silos" element={<ManageSilo />} />
            {/*<Route path="/manage-params" element={<ManageParameter />} />*/}
            <Route path="/manage-companies" element={<ManageCompanies />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
