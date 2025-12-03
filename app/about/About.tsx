import Image from "next/image";
import { getAboutPageData } from "../serveractions";

const About = async () => {
  const { project: data } = await getAboutPageData();
  return (
    <div className="w-full max-w-7xl rounded-3xl bg-white p-10 shadow-sm">
      <div className="w-full h-120 relative rounded-2xl overflow-hidden mb-8">
        <Image
          src={data.heroImage}
          alt="About Hero"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <h1 className="text-3xl font-semibold">{data.title}</h1>

      <p className="mt-4 text-slate-600">{data.description}</p>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.features.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50 transition"
          >
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-slate-600 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
