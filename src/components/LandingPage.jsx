import FormImage from "../assets/Form.png";

function LandingPage() {
  return (
    <>
      <div className="bg-white">
        <div className="container mx-auto py-28 px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-9">
            <div className="flex flex-col items-start justify-center text-left sm:ml-20">
              <h1 className="font-cabin glue-headline glue-headline--headline-2 hero-heading text-4xl sm:text-6xl mb-10 font-extralight">
                <div className="mb-5">Generate grades</div>
                <div className="mb-5">effortlessly, with</div>
                GradeWiz
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8">
                Upload tests, enter prompts, and let GradeWiz handle
                <br /> the rest in real-time.
                <br className="hidden sm:block" />
              </p>
              <div className="flex space-x-4">
                <button className="bg-white border-2 hover:border-sky-300 hover:bg-gray-50 text-blue-500 font-cabin text-center font-semibold py-3 px-6 rounded-sm">
                  Get Started
                </button>
              </div>
            </div>
            <div className="sm:justify-self-end mr-10 shadow-lg">
              <img
                src={FormImage}
                alt="Form"
                className="w-full shadow-md border rounded-lg"
              />
            </div>
          </div>
          <div className="flex items-center mt-0 ml-20 text-center">
            <p className="text-gray-600 mr-2">Don't have an account?</p>
            <button className="bg-white hover:border-sky-300 hover:bg-gray-50 text-blue-500 font-cabin text-center font-semibold py-3 px-4 rounded-md">
              Sign up for free
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
