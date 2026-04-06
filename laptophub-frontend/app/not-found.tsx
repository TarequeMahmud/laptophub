export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-900">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-8">Page Not Found</h2>
                <p className="text-slate-600 mb-8">The page you're looking for doesn't exist.</p>
                <a
                    href="/"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}