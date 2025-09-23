import { committeesData } from "@/lib/committeesData";
import { notFound } from "next/navigation";
import Image from "next/image";

import Footer from "@/components/ui/footer";

export async function generateStaticParams() {
  const paths = [];
  for (const category of committeesData) {
    if (category.name.toLowerCase() === "fests") continue;
    for (const committee of category.committees) {
      paths.push({
        category: category.name.toLowerCase(),
        committee: committee.name.toLowerCase().split(" ")[0],
      });
    }
  }
  return paths;
}

export default function CommitteePage({
  params,
}: {
  params: { category: string; committee: string };
}) {
  const categoryParam = params.category.toLowerCase();
  const committeeParam = params.committee.toLowerCase();

  if (categoryParam === "fests") {
    notFound();
  }
  const categoryData = committeesData.find(
    (c) => c.name.toLowerCase() === categoryParam
  );
  let committeeData = categoryData?.committees.find((com) =>
    com.name.toLowerCase().startsWith(committeeParam)
  );

  if (!categoryData || !committeeData) {
    notFound();
  }

  let logoUrl = "";
  if (categoryParam === "fests") {
    logoUrl = `/images/fests/${committeeParam}/logo.png`;
  } else {
    logoUrl = `/images/committees/${categoryParam}/${committeeParam}/logo.png`;
  }

  return (
    <>
      <main className=" text-white min-h-screen px-4 sm:px-8 py-16">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-left gap-12">
          <h1 className="text-5xl font-bold tracking-tight">
            {committeeData.name}
          </h1>
          <Image
            src={logoUrl}
            alt={`${committeeData.name} Logo`}
            width={250}
            height={250}
            className="rounded-lg"
            priority
          />

          {(categoryData.name) && (
            <Image
              src={`/images/committees/${categoryData.name.toLowerCase()}/${committeeData.name.toLowerCase().split(" ")[0]}/group.png`}
              alt={`${committeeData.name} Group`}
              width={600}
              height={250}
            />
          )}

          <section className="w-full ">
            <h2 className="text-3xl font-semibold mb-4">Our Vision.</h2>
            <p dangerouslySetInnerHTML={{ __html: committeeData.vision }} className="text-gray-300 leading-relaxed">
            </p>
          </section>

          <section className="w-full ">
            <h2 className="text-3xl font-semibold mb-6">Flagship Events</h2>
            <div className="flex flex-col gap-6">
              {committeeData.flagshipEvents.map((event) => (
                <div key={event.name}>
                  <h3 className="text-xl font-bold text-blue-400">
                    {event.name}
                  </h3>
                  <p className="text-gray-300 mt-1">{event.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* This logic is now safe because the check above guarantees categoryData exists */}
          {committeeData.team && (
            <section className="w-full">
              <h2 className="text-3xl font-semibold mb-8">Our Team.</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {committeeData.team.map((member) => (
                  <div key={member.name} className="team-member-card">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                    <div className="member-name-overlay">
                      <p>{member.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
