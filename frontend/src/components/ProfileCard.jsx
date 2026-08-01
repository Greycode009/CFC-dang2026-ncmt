const ProfileCard = ({ icon, title, description }) => {
  return (
    <div className="w-full lg:w-2/5 bg-[#e6f7f3] rounded-2xl p-8 flex flex-col justify-between items-center text-center min-h-[360px] lg:min-h-[460px]">
      {/* Graphic Icon Area */}
      <div className="my-auto flex flex-col items-center justify-center">
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-[#0d9488]/30 flex items-center justify-center bg-white/50 text-[#0d9488]">
          {icon}
        </div>
      </div>

      {/* Card Info Text */}
      <div className="space-y-2 max-w-xs">
        <h3 className="font-serif text-sm sm:text-xl font-bold text-[#0f5247]">
          {title}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#1e6a5e] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
