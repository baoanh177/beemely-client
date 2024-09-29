import RegisterForm from "@/pages/(auth)/RegisterForm";

const Register = () => {
  return (
    <section className="grid h-full grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-10">
      <div className="relative col-span-1 h-full w-full md:col-span-2 lg:col-span-3">
        <img src="/logo.png" className="absolute inset-5 z-20" />
        <img src="/register-page.png" className="absolute h-full w-full object-cover" />
      </div>
      <div className="col-span-1 flex md:col-span-2 md:items-center">
        <RegisterForm />
      </div>
    </section>
  );
};

export default Register;
