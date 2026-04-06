const SidebarProTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-3 bg-white">
      {/* Sidebar */}
      <div
        className="col-span-1 p-6 text-white"
        style={{ background: accentColor }}
      >
        <h1 className="text-2xl font-bold mb-4">
          {data.personal_info?.full_name}
        </h1>

        <div className="text-sm space-y-2 mb-6">
          <p>{data.personal_info?.email}</p>
          <p>{data.personal_info?.phone}</p>
          <p>{data.personal_info?.location}</p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="font-semibold mb-2">Skills</h2>
          {data.skills?.map((skill, i) => (
            <p key={i} className="text-sm">
              {skill}
            </p>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="col-span-2 p-8">
        {/* Summary */}
        {data.professional_summary && (
          <section className="mb-6">
            <h2 className="font-semibold mb-2" style={{ color: accentColor }}>
              Profile
            </h2>
            <p>{data.professional_summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-6">
            <h2 className="font-semibold mb-3" style={{ color: accentColor }}>
              Experience
            </h2>

            {data.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold">{exp.position}</h3>
                <p className="text-sm text-gray-500">
                  {exp.company} | {formatDate(exp.start_date)} -{" "}
                  {exp.is_current ? "Present" : formatDate(exp.end_date)}
                </p>
                <p className="text-gray-700 whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section>
            <h2 className="font-semibold mb-3" style={{ color: accentColor }}>
              Education
            </h2>

            {data.education.map((edu, i) => (
              <div key={i}>
                <p className="font-medium">{edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(edu.graduation_date)}
                </p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default SidebarProTemplate;
