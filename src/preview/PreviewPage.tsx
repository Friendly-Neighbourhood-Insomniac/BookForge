import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, ChevronLeft, ChevronRight, Share2, Download } from 'lucide-react';

const PreviewPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-2 text-white hover:text-gray-300">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white p-2">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="text-gray-300 hover:text-white p-2">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Area */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl w-full">
          {/* Book Preview */}
          <div className="bg-white rounded-lg shadow-2xl p-8 aspect-[8.5/11] mb-8">
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Demo Book Preview</h3>
              <p className="text-gray-600 mb-6">
                This is where your interactive book will be displayed in a beautiful flipbook format.
              </p>
              <div className="bg-gray-100 rounded-lg p-4 inline-block">
                <p className="text-sm text-gray-500">
                  Interactive elements, QR codes, and rich content will appear here
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4">
            <button className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="text-white text-sm">Page 1 of 1</span>
            <button className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;