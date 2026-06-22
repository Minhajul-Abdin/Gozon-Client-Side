"use client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import React, { useRef } from "react";
import { submitBookings } from "@/lib/actions/booking";

export default function BookingButton({ propertyId, property, user }) {
  const today = new Date().toISOString().split("T")[0];
  // Create a reference to the container to easily extract input fields without an outer form tag
  const containerRef = useRef(null);

  /*const handleBookingAndCheckout = async (e) => {
    // 1. Gather data manually using the container ref instead of e.currentTarget
    if (!containerRef.current) return;

    // We look up the inputs inside our container wrapper
    const nameInput = containerRef.current.querySelector('[name="name"]');
    const dateInput = containerRef.current.querySelector('[name="moveInDate"]');
    const contactInput = containerRef.current.querySelector(
      '[name="contactNumber"]',
    );
    const notesInput = containerRef.current.querySelector(
      '[name="additionalNotes"]',
    );

    // Basic browser validation check since we aren't using native form validation
    if (!nameInput?.value || !dateInput?.value || !contactInput?.value) {
      alert("Please fill out all required fields.");
      e.preventDefault(); // Stop the Stripe form submission
      return;
    }

    const formDataObject = {
      propertyId: propertyId,
      ownerId: property?.ownerId,
      propertyTitle: property?.propertyTitle,
      bookerEmail: user?.email,
      bookerId: user?.id,
      name: user?.name,
      fromBookerName: nameInput.value,
      moveInDate: dateInput.value,
      contactNumber: contactInput.value,
      additionalNotes: notesInput?.value || "",
    };

    // 2. Submit data to your Server Action
    try {
      const res = await submitBookings(formDataObject);
      if (res?.insertedId) {
        console.log("Booking data saved successfully.");
      }
    } catch (error) {
      console.error("Failed to save booking:", error);
    }

    // 3. Let the outer form action `/api/checkout_sessions` naturally proceed after this completes
  };*/

  const handlefav = () => {
    alert(`Initiating booking for property ID: ${propertyId}`);
  };

  return (
    <div className="space-y-3">
      <div>
        <Modal>
          <Button className="w-full bg-white hover:bg-neutral-200 text-black font-semibold py-3 px-4 rounded-xl transition duration-200 text-sm shadow-lg hover:shadow-white/5">
            Book Now
          </Button>
          <Modal.Backdrop className="backdrop-blur-sm bg-black/40">
            <Modal.Container placement="auto">
              <Modal.Dialog className="sm:max-w-md border border-neutral-800 bg-[#111115] text-zinc-100 rounded-2xl overflow-hidden shadow-xl">
                <Modal.CloseTrigger className="text-black-900 hover:text-black" />
                <Modal.Header className="border-b border-neutral-800/60 pb-4">
                  <div>
                    <h2 className="text-xl uppercase font-bold text-neutral-100 tracking-tight">
                      {property?.propertyTitle}
                    </h2>
                    <p className="text-sm text-neutral-400 mt-1">
                      Reserve your place
                    </p>
                  </div>
                </Modal.Header>
                <Modal.Body className="py-4">
                  <form action="/api/payment" method="POST">
                    <Surface variant="default" className="bg-transparent">
                      {/* Replaced form tag with a styled div element using a ref */}
                      <div ref={containerRef} className="space-y-4">
                        {/* Booker Name */}

                        <div className="hidden">
                          <input
                            name="propertyTitle"
                            defaultValue={property?.propertyTitle}
                          />
                          <input name="propertyId" defaultValue={propertyId} />
                          <input
                            name="price"
                            defaultValue={property?.rentPrice}
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-neutral-300">
                            Booker Name
                          </label>

                          <input
                            required
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            className="w-full rounded-xl bg-[#0A0A0A] border border-neutral-800 px-4 py-3 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
                          />
                        </div>

                        {/* Move-in Date Picker */}
                        <div>
                          <label className="block mb-2 text-sm font-medium text-neutral-300">
                            Move-in Date
                          </label>
                          <input
                            required
                            type="date"
                            name="moveInDate"
                            min={today}
                            defaultValue={today}
                            className="w-full rounded-xl bg-[#0A0A0A] border border-neutral-800 px-4 py-3 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500/50 transition-colors [color-scheme:dark]"
                          />
                        </div>

                        {/* Contact Number */}
                        <div>
                          <label className="block mb-2 text-sm font-medium text-neutral-300">
                            Contact Number
                          </label>
                          <input
                            required
                            type="tel"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            name="contactNumber"
                            placeholder="017XXXXXXXX"
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            className="w-full rounded-xl bg-[#0A0A0A] border border-neutral-800 px-4 py-3 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
                          />
                        </div>

                        {/* Additional Notes */}
                        <div>
                          <label className="block mb-2 text-sm font-medium text-neutral-300">
                            Additional Notes
                          </label>
                          <textarea
                            name="additionalNotes"
                            rows="3"
                            placeholder="Any extra preferences or requirements..."
                            className="w-full rounded-xl bg-[#0A0A0A] border border-neutral-800 px-4 py-3 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
                          ></textarea>
                        </div>

                        <Modal.Footer className="border-t border-neutral-800 pt-4 flex gap-3 justify-end">
                          <Button
                            className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium rounded-xl transition border border-neutral-700/40"
                            slot="close"
                            variant="secondary"
                          >
                            Cancel
                          </Button>

                          {/* Only keeping this single actual form element */}

                          <section>
                            <button
                              type="submit"
                              className="bg-white hover:bg-neutral-200 text-black font-semibold py-3 px-4 rounded-xl transition duration-200 text-sm shadow-lg hover:shadow-white/5"
                              slot="close"
                              role="link"
                            >
                              Book now
                            </button>
                          </section>
                        </Modal.Footer>
                      </div>
                    </Surface>
                  </form>
                </Modal.Body>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>

      <button
        onClick={handlefav}
        className="w-full flex items-center justify-center gap-2 bg-rose-950/30 hover:bg-rose-900/40 text-rose-400 hover:text-rose-300 font-semibold py-3 px-4 rounded-xl border border-rose-900/30 hover:border-rose-800/50 transition-all duration-200 text-sm shadow-lg shadow-rose-950/10 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
        Add To Favorite
      </button>
    </div>
  );
}
