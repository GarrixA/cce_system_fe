export const conditionStyles: any = {
  New: "text-green-700 bg-green-100 px-2 py-1 rounded-md",
  Good: "text-blue-700 bg-blue-100 px-2 py-1 rounded-md",
  "Worn Out": "text-yellow-700 bg-yellow-100 px-2 py-1 rounded-md",
  Broken: "text-red-700 bg-red-100 px-2 py-1 rounded-md",
};

export const statusStyles: any = {
  Available: "text-green-800 bg-green-200 px-2 py-1 rounded-md",
  Damaged: "text-red-800 bg-red-200 px-2 py-1 rounded-md",
  Borrowed: "text-orange-800 bg-orange-200 px-2 py-1 rounded-md",
};

export const statusColors: Record<string, string> = {
  Available: "bg-green-100 text-green-700",
  Damaged: "bg-red-100 text-red-700",
  Borrowed: "bg-yellow-100 text-yellow-700",
};

export const conditionColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Good: "bg-green-100 text-green-700",
  "Worn Out": "bg-yellow-100 text-yellow-700",
  Broken: "bg-red-100 text-red-700",
};

export const roleColors: Record<string, string> = {
  Admin: "bg-red-100 text-red-800 border border-red-300",
  Trainer: "bg-blue-100 text-blue-800 border border-blue-300",
  Manager: "bg-green-100 text-green-800 border border-green-300",
  Trainee: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  Default: "bg-gray-100 text-gray-800 border border-gray-300",
};
