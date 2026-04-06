const ModernCardTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white shadow rounded-2xl p-6 mb-6">
        <h1 className="text-3xl font-bold" style={{ color: accentColor }}>
          {data.personal_info?.full_name}
        </h1>
        <p className="text-gray-600 mt-2">
          {data.personal_info?.email} • {data.personal_info?.phone}
        </p>
        <p className="text-gray-500">{data.personal_info?.location}</p>
      </div>

      {/* Summary */}
      {data.professional_summary && (
        <div className="bg-white shadow rounded-2xl p-6 mb-6">
          <h2 className="font-semibold mb-2" style={{ color: accentColor }}>
            Summary
          </h2>
          <p className="text-gray-700">{data.professional_summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div className="bg-white shadow rounded-2xl p-6 mb-6">
          <h2 className="font-semibold mb-4" style={{ color: accentColor }}>
            Experience
          </h2>

          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-semibold">{exp.position}</h3>
                <span className="text-sm text-gray-500">
                  {formatDate(exp.start_date)} -{" "}
                  {exp.is_current ? "Present" : formatDate(exp.end_date)}
                </span>
              </div>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-gray-700 whitespace-pre-line">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="font-semibold mb-3" style={{ color: accentColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm"
                style={{ background: accentColor + "20", color: accentColor }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernCardTemplate;
