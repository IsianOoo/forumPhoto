import { useNavigate } from "react-router-dom";

export default function CourseCard({ id, title, difficulty, duration, language, thumbnail }) {
    const navigate = useNavigate();

    const handleStartClick = () => {
        if (id) {
            navigate(`/course/${id}`); 
        } else {
            console.error("Error: Course ID is undefined");
        }
    };
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col">
          <img
              className="w-full h-60 object-cover"
              src={thumbnail || "https://via.placeholder.com/300"} 
              alt={title}
          />
          <div className="p-4 flex-1">
              <span className="bg-purple-200 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  #Photography course
              </span>
              <h3 className="font-bold text-lg mt-2">{title}</h3>
              <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                  📚 {difficulty} • ⏳ {duration} Weeks • 💬 {language}
              </p>
          </div>
          <div className="p-4 flex flex-col items-center">
              <button 
                  onClick={handleStartClick}
                  className="w-full bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition"
              >
                  Start
              </button>
          </div>
      </div>
  );
}
