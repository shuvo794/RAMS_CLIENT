"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BASE_URL, GET_CLIENTS_DETAILS } from "@/lib/config";

interface Client {
  id: number;
  name: string;
  serial_number: number;
  image: string;
}

function getImageName(imagePath: string): string {
  // Extract filename without extension
  const filename = imagePath.split("/").pop() || "";
  return filename.split(".")[0];
}

export default function ClientsDetails() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await fetch(
  //         `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/without_pagination/all/`
  //       );
  //       const data = await response.json();
  //       const brandImages = data.content_images.filter(
  //         (img: ContentImage) => img.head === "Brand"
  //       );
  //       console.log("brandImages", brandImages);
  //       setImages(brandImages);
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchImages();
  // }, []);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(GET_CLIENTS_DETAILS);
        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }
        const data = await response.json();
        console.log("jdfhsadkjhas", data);
        if (data && data.clients) {
          // Sort by serial_number
          const sortedClients = [...data.clients].sort(
            (a, b) => a.serial_number - b.serial_number
          );
          setClients(sortedClients);
        }
      } catch (err) {
        console.error("Error fetching clients:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-10 mb-10 px-4 text-center">Loading clients...</div>
    );
  }

  return (
    <section className="mt-10 mb-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-center md:block">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {clients.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="w-64 h-80 overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 h-full flex flex-col items-center justify-between">
                    <div className="w-full flex-1 flex items-center justify-center">
                      <div className="relative w-40 h-40">
                        <Image
                          src={`${BASE_URL}${image.image}`}
                          alt={getImageName(image.image)}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="text-center mt-4 text-sm font-medium text-gray-600">
                      {image.name}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
