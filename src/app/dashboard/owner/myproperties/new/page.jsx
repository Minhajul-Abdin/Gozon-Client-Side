"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Select,
  ListBox,
  Button,
  toast,
} from "@heroui/react";
import { Briefcase, Globe, CloudArrowUpIn } from "@gravity-ui/icons";
import { useSession } from "@/lib/auth-client";
import { creatProperty } from "@/lib/actions/property";
import { redirect } from "next/navigation";

export default function PostPropertyPage() {
  // Auto-filled owner information from your auth session data
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const amenities = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];
  const [errors, setErrors] = useState({});
  const [selectedImages, setSelectedImages] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Handle image selection & preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Upload to ImgBB
  const uploadToImgBB = async (file) => {
    const imgbbApiKey = "ae0ba10184298aa38421340e38125403";
    const body = new FormData();
    body.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      {
        method: "POST",
        body: body,
      },
    );

    const data = await response.json();
    if (!data.success) {
      throw new Error("Failed to upload profile photo.");
    }
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const selectedAmenities = formData.getAll("amenities");

    const newErrors = {};
    if (!data.propertyTitle)
      newErrors.propertyTitle = "Property title is required";
    if (!data.propertyType)
      newErrors.propertyType = "Property type is required";
    if (!data.rentPrice) newErrors.rentPrice = "Rent price is required";
    if (!data.rentType) newErrors.rentType = "Rent type selection is required";
    if (!data.bedrooms) newErrors.bedrooms = "Number of bedrooms is required";
    if (!data.bathrooms)
      newErrors.bathrooms = "Number of bathrooms is required";
    if (!data.propertySize)
      newErrors.propertySize = "Property size is required";
    if (!data.location) newErrors.location = "Location address is required";
    if (!data.description)
      newErrors.description = "Property description is required";
    if (!data.amenities) newErrors.amenities = "Amenities are required";

    // console.log("Validation errors:", newErrors);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    let imageUrl = "";

    // Upload the image first if chosen
    if (imageFile) {
      imageUrl = await uploadToImgBB(imageFile);
    }

    const payload = {
      ...data,
      selectedAmenities,
      images: imageUrl,
      ownerId: user?.id,
      status: "Pending",
    };
    console.log("post data: ", payload);

    const res = await creatProperty(payload);
    if (res?.insertedId) {
      toast.success("Property posted successfully!");
      e.target.reset();
      setSelectedImages(null);
      redirect("/dashboard/owner/myproperties");
    }
  };

  // Original dark styles matching your reference layout exactly
  const textInputClass =
    "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg h-12 px-3 text-sm placeholder:text-zinc-600 outline-none transition-all";
  const textAreaClass =
    "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg p-3 text-sm placeholder:text-zinc-600 outline-none transition-all";

  const selectBoxClass = "w-full";
  const triggerClasses =
    "w-full flex items-center justify-between bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] h-12 rounded-lg px-3 text-white transition-all text-sm outline-none data-[focused=true]:border-zinc-600 data-[invalid=true]:border-danger";
  const popoverClasses =
    "bg-[#1c1c1e] border border-zinc-800 text-white rounded-lg shadow-xl p-1";
  const listItemClasses =
    "flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800";

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 p-4 md:p-6 relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl">
          {/* Form Header block */}
          <div className="border-b w-full text-center border-zinc-800 pb-6 mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">
              Post a New Property
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Fill out the details below to publish your open property listing.
            </p>

            {/* Owner verification status panel */}
            <div className="mt-4 inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
              <Briefcase size={14} className="text-zinc-500" />
              Owner Name:{" "}
              <span className="font-semibold text-zinc-300">{user?.name}</span>
            </div>
          </div>

          {/* Hero UI Main Form Handler */}
          <Form
            onSubmit={handleSubmit}
            className="space-y-8"
            validationErrors={errors}
            validationBehavior="aria"
          >
            {/* SECTION 1: Property Basic Information */}
            <Fieldset className="space-y-6 w-full">
              <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                Property Information
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                  name="propertyTitle"
                  isInvalid={!!errors.propertyTitle}
                  className="flex flex-col gap-1 w-full"
                >
                  <Label className="text-zinc-400 font-medium text-sm">
                    Property Title
                  </Label>
                  <Input
                    placeholder="e.g. Modern Downtown Apartment"
                    className={textInputClass}
                  />
                  {errors.propertyTitle && (
                    <FieldError className="text-xs text-danger mt-1">
                      {errors.propertyTitle}
                    </FieldError>
                  )}
                </TextField>

                <Select
                  className={selectBoxClass}
                  name="propertyType"
                  isInvalid={!!errors.propertyType}
                >
                  <Label className="text-zinc-400 font-medium text-sm mb-1 block">
                    Property Type
                  </Label>
                  <Select.Trigger className={triggerClasses}>
                    <Select.Value className="text-white placeholder:text-zinc-600" />
                    <Select.Indicator />
                  </Select.Trigger>
                  {errors.propertyType && (
                    <span className="text-xs text-danger mt-1">
                      {errors.propertyType}
                    </span>
                  )}
                  <Select.Popover className={popoverClasses}>
                    <ListBox className="outline-none">
                      <ListBox.Item
                        id="apartment"
                        className={listItemClasses}
                        textValue="Apartment"
                      >
                        Apartment
                      </ListBox.Item>
                      <ListBox.Item
                        id="house"
                        className={listItemClasses}
                        textValue="House"
                      >
                        House
                      </ListBox.Item>
                      <ListBox.Item
                        id="condo"
                        className={listItemClasses}
                        textValue="Condo"
                      >
                        Condo
                      </ListBox.Item>
                      <ListBox.Item
                        id="townhouse"
                        className={listItemClasses}
                        textValue="Townhouse"
                      >
                        Townhouse
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inline layout grouping for Rent Price and Rent Type Mapping */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 space-y-1">
                    <span className="text-zinc-400 font-medium text-sm block">
                      Rent (Price)
                    </span>
                    <TextField
                      name="rentPrice"
                      isInvalid={!!errors.rentPrice}
                      className="w-full"
                    >
                      <Input
                        placeholder="Amount"
                        type="number"
                        className={textInputClass}
                      />
                    </TextField>
                  </div>

                  <Select
                    className="w-full mt-6"
                    name="rentType"
                    defaultSelectedKeys={["Monthly"]}
                  >
                    <Select.Trigger className={triggerClasses}>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className={popoverClasses}>
                      <ListBox className="outline-none">
                        <ListBox.Item
                          id="Monthly"
                          className={listItemClasses}
                          textValue="Monthly"
                        >
                          Monthly
                        </ListBox.Item>
                        <ListBox.Item
                          id="Weekly"
                          className={listItemClasses}
                          textValue="Weekly"
                        >
                          Weekly
                        </ListBox.Item>
                        <ListBox.Item
                          id="Daily"
                          className={listItemClasses}
                          textValue="Daily"
                        >
                          Daily
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <TextField
                  name="propertySize"
                  isInvalid={!!errors.propertySize}
                  className="flex flex-col gap-1 w-full"
                >
                  <Label className="text-zinc-400 font-medium text-sm">
                    Property Size (sq ft)
                  </Label>
                  <Input
                    placeholder="e.g. 1200"
                    type="number"
                    className={textInputClass}
                  />
                  {errors.propertySize && (
                    <FieldError className="text-xs text-danger mt-1">
                      {errors.propertySize}
                    </FieldError>
                  )}
                </TextField>
              </div>

              {/* Structural specifics room counts configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                  name="bedrooms"
                  isInvalid={!!errors.bedrooms}
                  className="flex flex-col gap-1 w-full"
                >
                  <Label className="text-zinc-400 font-medium text-sm">
                    Bedrooms
                  </Label>
                  <Input
                    placeholder="Number of bedrooms"
                    type="number"
                    className={textInputClass}
                  />
                  {errors.bedrooms && (
                    <FieldError className="text-xs text-danger mt-1">
                      {errors.bedrooms}
                    </FieldError>
                  )}
                </TextField>

                <TextField
                  name="bathrooms"
                  isInvalid={!!errors.bathrooms}
                  className="flex flex-col gap-1 w-full"
                >
                  <Label className="text-zinc-400 font-medium text-sm">
                    Bathrooms
                  </Label>
                  <Input
                    placeholder="Number of bathrooms"
                    type="number"
                    step="0.5"
                    className={textInputClass}
                  />
                  {errors.bathrooms && (
                    <FieldError className="text-xs text-danger mt-1">
                      {errors.bathrooms}
                    </FieldError>
                  )}
                </TextField>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-zinc-400 font-medium text-sm">
                      Location Address
                    </Label>
                  </div>

                  <TextField
                    name="location"
                    isInvalid={!!errors.location}
                    className="flex flex-col gap-1 w-full relative"
                  >
                    <div className="relative flex items-center">
                      <Globe
                        size={16}
                        className="absolute left-3 text-zinc-600 pointer-events-none z-10"
                      />
                      <Input
                        placeholder="e.g. 123 Luxury Way, Los Angeles, CA"
                        className={`${textInputClass} pl-10`}
                      />
                    </div>
                    {errors.location && (
                      <FieldError className="text-xs text-danger mt-1">
                        {errors.location}
                      </FieldError>
                    )}
                  </TextField>
                </div>
              </div>
            </Fieldset>

            {/* SECTION 2: Descriptions*/}
            <Fieldset className="space-y-6 w-full">
              <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                Property Details & Description
              </legend>

              <TextField
                name="description"
                isInvalid={!!errors.description}
                className="flex flex-col gap-1 w-full"
              >
                <Label className="text-zinc-400 font-medium text-sm">
                  Description
                </Label>
                <TextArea
                  placeholder="Describe the open spaces, layout conditions, views, and neighborhood vibe..."
                  rows={4}
                  className={textAreaClass}
                />
                {errors.description && (
                  <FieldError className="text-xs text-danger mt-1">
                    {errors.description}
                  </FieldError>
                )}
              </TextField>
              {/* SECTION 2: Amenities */}
              <div>
                <Label className=" text-zinc-400 font-medium text-sm">
                  Amenities
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities?.map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-[#1c1c1e] px-4 py-3 cursor-pointer hover:border-zinc-600 hover:bg-[#242426] transition-all"
                    >
                      <input
                        name="amenities"
                        type="checkbox"
                        value={item}
                        className="w-4 h-4 accent-white rounded bg-zinc-900 border-zinc-800"
                      />
                      <span className="text-sm text-zinc-300 font-medium">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <TextField
                name="extraFeatures"
                className="flex flex-col gap-1 w-full"
              >
                <Label className="text-zinc-400 font-medium text-sm">
                  Extra Features (Optional)
                </Label>
                <TextArea
                  placeholder="e.g. Pet-friendly backyard, EV Charging dock installed, walk-in closets..."
                  rows={3}
                  className={textAreaClass}
                />
              </TextField>

              {/* Image Media Upload Field styled precisely to match layout text patterns */}
              <div className="flex flex-col gap-1.5 w-full">
                <Label className="text-zinc-400 font-medium text-xs">
                  Profile Photo
                </Label>

                <div className="flex items-center gap-4 mt-0.5 w-full">
                  <label className="flex flex-col items-center justify-center flex-1 h-20 border border-dashed border-zinc-800 rounded-xl cursor-pointer bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all group relative overflow-hidden">
                    <div className="flex items-center gap-3 px-4 w-full">
                      <div className="p-2 bg-zinc-800/50 rounded-lg text-zinc-400 group-hover:text-zinc-200 group-hover:bg-zinc-800 transition-colors">
                        <CloudArrowUpIn className="w-4 h-4" />
                      </div>
                      <div className="text-left max-w-[200px] truncate">
                        <p className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                          Upload avatar
                        </p>
                        <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                          {imageFile ? imageFile.name : "PNG, JPG up to 5MB"}
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>

                  {/* Micro-preview Element */}
                  {imagePreview && (
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0 flex items-center justify-center relative animate-appearance-in">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Fieldset>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 w-full">
              <Button
                type="button"
                variant="bordered"
                className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-6 font-medium h-11"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
              >
                Submit Property
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
