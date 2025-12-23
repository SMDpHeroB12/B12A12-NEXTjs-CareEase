import About from "@/components/Home/About/About";
import Banner from "@/components/Home/Banner/Banner";
import Logo from "@/components/Logo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-base-100">
      {/* Care-Ease-B12A12 */}
      {/* Banner */}
      <Banner></Banner>
      {/* About */}
      <About></About>
      {/* Services Overview */}
      <section className="py-16 bg-base-200 text-center px-4">
        <h2 className="text-3xl font-semibold mb-10">Our Services</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["Baby Care", "Elderly Care", "Sick Person Care"].map((service) => (
            <div key={service} className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="card-title justify-center">{service}</h3>
                <p className="text-sm text-gray-600">
                  Professional and trusted {service.toLowerCase()} service.
                </p>
                <div className="card-actions justify-center mt-4">
                  <button className="btn btn-neutral btn-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 text-center px-4">
        <h2 className="text-3xl font-semibold">Trusted by Families</h2>
        <p className="mt-4 text-gray-600">
          Thousands of families rely on CareEase for quality caregiving.
        </p>
      </section>
    </main>
  );
}
