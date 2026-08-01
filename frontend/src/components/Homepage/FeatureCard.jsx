import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const FeatureCard = ({ icon: Icon, title, description, linkTo }) => {
  return (
    <div className="group relative bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Hover accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0d9488] to-[#0ea5a0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div>
        {/* Icon Badge */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/60 text-[#0d9488] flex items-center justify-center text-xl mb-5 group-hover:bg-gradient-to-br group-hover:from-[#0d9488] group-hover:to-[#0ea5a0] group-hover:text-white group-hover:shadow-lg group-hover:shadow-teal-500/20 transition-all duration-300">
          <Icon />
        </div>

        {/* Card Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-[#0d9488] transition-colors">
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
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#0d9488] hover:text-[#0b7a70] transition group/link"
        >
          <span>Explore</span>
          <FaArrowRight className="text-[10px] group-hover:translate-x-1.5 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;
