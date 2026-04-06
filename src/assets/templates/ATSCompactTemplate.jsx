const ATSCompactTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 text-black text-sm">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">{data.personal_info?.full_name}</h1>
        <p>
          {data.personal_info?.email} | {data.personal_info?.phone}
        </p>
      </div>

      {/* Summary */}
      {data.professional_summary && (
        <p className="mb-4">{data.professional_summary}</p>
      )}

      {/* Experience */}
      {data.experience?.map((exp, i) => (
        <div key={i} className="mb-3">
          <p className="font-semibold">
            {exp.position} - {exp.company}
          </p>
          <p className="text-xs">
            {formatDate(exp.start_date)} -{" "}
            {exp.is_current ? "Present" : formatDate(exp.end_date)}
          </p>
          <p>{exp.description}</p>
        </div>
      ))}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <p className="mt-4">
          <strong>Skills:</strong> {data.skills.join(", ")}
        </p>
      )}
    </div>
  );
};

export default ATSCompactTemplate;
