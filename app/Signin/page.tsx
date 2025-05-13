"use client";
import LoginPage from "@/components/Login";
import { Card, CardContent } from "@/components/ui/card";

const page = () => {
  // const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle authentication here
    //   router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-blue-500 p-8 md:p-16">
      <div className="flex flex-col md:flex-row w-full  max-w-6xl rounded-2xl shadow-2xl overflow-hidden bg-white">
        {/* Left Section */}
        <Card className="flex flex-col flex-1 items-center bg-blue-600 justify-center border-0 rounded-none p-12">
          <CardContent className="flex flex-col items-center justify-center w-full max-w-md">
            <div
              style={{
                color: "white",

                animation: "fadeIn 1s ease-in-out",
              }}
            >
              <img className="logo-icon w-[64px]" src="/bbit.png" />

              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "600",
                  marginTop: "1.5rem",
                  marginBottom: "1rem",
                  lineHeight: "1.2",
                }}
              >
                Welcome to <span style={{ fontWeight: "300" }}>Rams</span>
              </h1>

              <p
                style={{
                  fontSize: "1.125rem",
                  lineHeight: "1.6",
                  marginBottom: "2rem",
                  opacity: "0.9",
                  maxWidth: "500px",
                }}
              >
                Join our community of passionate developers. Learn, build, and
                share your coding journey with like-minded peers around the
                globe.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-center p-12 border-t md:border-t-0 md:border-l border-gray-200">
          <LoginPage />
        </div>
      </div>
    </div>
  );
};

export default page;
