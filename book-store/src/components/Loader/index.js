import { ThreeDots as LoadingView } from "react-loader-spinner";

const Loader = () => (
  <div className="booksList-loader-container">
    <LoadingView color="#0b69ff" height="50" width="50" ariaLabel="loading" />
  </div>
);

export default Loader;
