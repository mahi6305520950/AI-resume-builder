import React from 'react'

const Title = ({ title, description }) => {
  return (
    <div className="text-center mt-6 text-slate-500">
      <h1 className=" bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent text-nowrap text-3xl sm:text-4xl font-medium">
        {title}
      </h1>
      <p className="max-sm max-w-2xl mt-4 text-slate-500">{description}</p>
    </div>
  );
};

export default Title