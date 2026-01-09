import { motion } from 'framer-motion';
import { Play, Info, Bell, Search, User, ChevronDown } from 'lucide-react';

/* Placeholder movie data */
const MOVIES = [
    { id: 1, title: 'Stranger Things', image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2670&auto=format&fit=crop', top10: true },
    { id: 2, title: 'The Witcher', image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2670&auto=format&fit=crop' },
    { id: 3, title: 'Cyberpunk 2077', image: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?q=80&w=2574&auto=format&fit=crop', top10: true },
    { id: 4, title: 'Inception', image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2670&auto=format&fit=crop' },
    { id: 5, title: 'Interstellar', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop' },
    { id: 6, title: 'The Dark Knight', image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?q=80&w=2670&auto=format&fit=crop' },
    { id: 7, title: 'Blade Runner 2049', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2659&auto=format&fit=crop' },
    { id: 8, title: 'Dune', image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=2600&auto=format&fit=crop' },
];

const MovieCard = ({ movie, index }: { movie: typeof MOVIES[0], index: number }) => {
    return (
        <motion.div
            className="relative aspect-[2/3] bg-[#2f2f2f] rounded-sm cursor-pointer group overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
                scale: 1.05,
                zIndex: 10,
                transition: { duration: 0.2 }
            }}
        >
            <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2670&auto=format&fit=crop"; // Fallback image
                }}
            />
            {movie.top10 && (
                <div className="absolute top-0 right-0 bg-[#E50914] text-xs font-bold px-2 py-1 rounded-bl shadow-md">
                    TOP 10
                </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <h4 className="font-bold text-sm text-center drop-shadow-md">{movie.title}</h4>
                <div className="flex justify-center mt-2 gap-2">
                    <div className="p-1.5 bg-white rounded-full text-black hover:scale-110 transition flex items-center justify-center">
                        <Play className="w-3 h-3 fill-black" />
                    </div>
                    <div className="p-1.5 border border-white rounded-full hover:bg-white/20 transition flex items-center justify-center">
                        <Info className="w-3 h-3" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Browse = () => {
    return (
        <div className="min-h-screen bg-[#141414] text-white font-sans selection:bg-[#E50914] selection:text-white pb-20">

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-[4%] py-4 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-8">
                    <h1 className="text-3xl font-extrabold text-[#E50914] tracking-tighter" style={{ textShadow: '0 0 20px rgba(229, 9, 20, 0.5)' }}>
                        NETFLIX
                    </h1>
                    <div className="hidden md:flex gap-5 text-sm font-medium text-gray-300">
                        <a href="#" className="text-white hover:text-gray-300 transition">Home</a>
                        <a href="#" className="hover:text-gray-300 transition">TV Shows</a>
                        <a href="#" className="hover:text-gray-300 transition">Movies</a>
                        <a href="#" className="hover:text-gray-300 transition">New & Popular</a>
                        <a href="#" className="hover:text-gray-300 transition">My List</a>
                    </div>
                </div>

                <div className="flex items-center gap-5 text-white">
                    <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                    <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-xs font-bold">
                            <User className="w-5 h-5" />
                        </div>
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative h-[85vh] w-full">
                {/* Hero Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2670&auto=format&fit=crop')`
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/80 via-[#141414]/20 to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-[4%] pt-20 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-6xl font-black mb-4 drop-shadow-2xl">STRANGER THINGS</h2>
                        <div className="flex items-center gap-3 text-sm font-semibold mb-6">
                            <span className="text-[#46d369]">98% Match</span>
                            <span className="text-gray-300">2024</span>
                            <span className="border border-gray-500 px-1 text-xs">TV-MA</span>
                            <span className="text-gray-300">4 Seasons</span>
                        </div>
                        <p className="text-lg text-gray-200 mb-8 drop-shadow-md line-clamp-3">
                            When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.
                        </p>

                        <div className="flex gap-4">
                            <button className="flex items-center gap-3 bg-white text-black px-8 py-2.5 rounded hover:bg-white/90 transition font-bold text-lg">
                                <Play className="fill-black w-6 h-6" /> Play
                            </button>
                            <button className="flex items-center gap-3 bg-[#6d6d6eb3] text-white px-8 py-2.5 rounded hover:bg-[#6d6d6eb3]/70 transition font-bold text-lg">
                                <Info className="w-6 h-6" /> More Info
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Movie Grid Section */}
            <div className="px-[4%] -mt-32 relative z-20">
                <h3 className="text-xl font-semibold mb-4 text-white drop-shadow-md">New Releases</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                    {MOVIES.map((movie, index) => (
                        <MovieCard key={movie.id} movie={movie} index={index} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Browse;
