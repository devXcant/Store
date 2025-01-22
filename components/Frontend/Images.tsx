import { useState, useEffect, JSX } from "react";

interface ImageType {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
  };
}

export default function ImagesUI(): JSX.Element {
  const [images, setImages] = useState<ImageType[]>([]); // Correct type for images
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const access_Key = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string
  useEffect(() => {
    

      console.log(access_Key)

    async function fetchImages() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=shoes&per_page=30&client_id=L204sknrX9m9qW--qR-E3Kxl8t8YJ19LctCCDYQ3y04`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setImages(data.results);
        setError(null);
      } catch (error: any) {
        setError(error.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [access_Key]);

  return (
    <div className="p-4">
      {loading && <p className="text-center">Loading images...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description || "Image"}
              className="rounded shadow-md"
            />
          ))}
        </div>
      )}
    </div>
  );
}
