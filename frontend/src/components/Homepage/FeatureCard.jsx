import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const FeatureCard = ({ icon: Icon, title, description, linkTo }) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition duration-200 flex flex-col justify-between group">
      <div>
        {/* Icon Badge */}
        <div className="w-12 h-12 rounded-2xl bg-[#e6f4f1] text-[#0d9488] flex items-center justify-center text-xl mb-5 group-hover:bg-[#0d9488] group-hover:text-white transition duration-200">
          <Icon />
        </div>

        {/* Card Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {title}
        </h3>

        {/* Card Description */}
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Action Link */}
      <div>
        <Link
          to={linkTo}
          className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#0d9488] hover:text-[#0b7a70] transition"
        >
          <span>Learn More</span>
          <FaArrowRight className="text-xs group-hover:translate-x-1 transition transform" />
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;
