const OnBoardingLoading: React.FC = () => {
  return (
    <div className="loader-screen">
      <div className="white-circle">
        <div className="circle-inner-content">
          <h3 className="circle-heading">Meet Evie AI</h3>
          <h3 className="circle-heading">Your Artificial Intelligence</h3>
          <div className="loader-img-box rotating">
            <img className="loader-size" src="/images/loader.PNG" alt="img-fluid" />
          </div>
          <span className="crowd-text">Hello Crowd</span>
          <span className="w-enoch-text">Welcome to Enoch</span>
        </div>
      </div>
    </div>
  );
};
export default OnBoardingLoading;
