"use client";
import React from "react";
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Edit2, Trash2, Building2, Plus } from "lucide-react";
import { RemoveFav } from "@/lib/actions/delete";
const RemoveFavbtn = ({ id }) => {
  const handleRemove = async (id) => {
    await RemoveFav(id);
  };
  return (
    <div>
      <Button
        onPress={() => {
          handleRemove(id);
        }}
        isIconOnly
        size="sm"
        variant="light"
        color="danger"
        radius="full"
        className="hover:bg-rose-500/10 text-rose-400/70 hover:text-rose-400 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] border border-transparent hover:border-rose-500/20"
      >
        <Trash2 className="w-4 h-4 drop-shadow-[0_0_8px_currentColor]" />
      </Button>
    </div>
  );
};

export default RemoveFavbtn;
