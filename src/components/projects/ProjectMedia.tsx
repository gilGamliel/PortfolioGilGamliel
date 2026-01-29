'use client';

import { useState } from 'react';
import Image from 'next/image';
import { NormalizedProject, hasVideo, hasImages } from '@/types';

interface ProjectMediaProps {
  project: NormalizedProject;
}

/**
 * Media section component that handles all media display scenarios:
 * - Video only
 * - Images only
 * - Video + Images
 * - No media (returns null)
 */
export function ProjectMedia({ project }: ProjectMediaProps) {
  const showVideo = hasVideo(project);
  const showImages = hasImages(project);

  // No media - return nothing
  if (!showVideo && !showImages) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Video Player */}
      {showVideo && project.videoUrl && <VideoPlayer url={project.videoUrl} />}

      {/* Image Gallery */}
      {showImages && <ImageGallery images={project.images} />}
    </div>
  );
}

/**
 * Video player component with controls
 */
function VideoPlayer({ url }: { url: string }) {
  return (
    <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
      <video
        src={url}
        controls
        playsInline
        className="absolute inset-0 w-full h-full object-contain"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

/**
 * Image gallery with lightbox functionality
 */
function ImageGallery({ images }: { images: NormalizedProject['images'] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-10 h-10 text-white drop-shadow-lg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </>
  );
}

/**
 * Lightbox modal for viewing images full-screen
 */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: NormalizedProject['images'];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  if (!images || images.length === 0) return null;
  
  const currentImage = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const handlePrev = () => {
    if (hasPrev) onNavigate(currentIndex - 1);
  };

  const handleNext = () => {
    if (hasNext) onNavigate(currentIndex + 1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Close lightbox"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Navigation */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Previous image"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Next image"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[85vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={1200}
          height={800}
          className="object-contain max-h-[85vh] rounded-lg"
        />
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
