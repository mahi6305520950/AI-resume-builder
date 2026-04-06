import React from 'react'
import {
  Sparkles,
  Eye,
  CheckCircle,
  Layout,
  Upload,
  Download,
  Layers,
} from "lucide-react";
import { features } from './CardData';

const iconMap = {
  Sparkles: Sparkles,
  Eye: Eye,
  CheckCircle: CheckCircle,
  Layout: Layout,
  Upload: Upload,
  Download: Download,
  Layers: Layers,
};

const CardFeatures = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <h2 className=" bg-gradient-to-r from-emerald-500 to-orange-700 bg-clip-text text-transparent text-nowrap text-3xl sm:text-4xl font-medium text-center mb-15">
        Powerful Features to Build Your Resume
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((f, index) => {
          const Icon = iconMap[f.icon];
          return (
            <div
              key={index}
              className="p-6 rounded-2xl border-2 border-amber-100 hover:-translate-y-1 transition duration-300 shadow-xl"
            >
              <Icon className="w-8 h-8 mb-4 text-blue-900" />
              <h3 className="text-xl font-semibold mb-2 text-blue-950">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CardFeatures