import img from "@/public/linkdln_pic.jpg";
import {
  bloom,
  bloom1,
  bloom2,
  bloom3,
  chair,
  chair1,
  chair2,
  cup,
  cup1,
  cup2,
  cup3,
  laptop,
  laptop1,
  laptop2,
  laptop3,
  monitor,
  monitor1,
  monitor2,
  mop,
  mop1,
  mop2,
  plate,
  plate1,
  plate2,
  plate3,
  table,
  table1,
  table2,
  table3,
} from "./imageUtils";

interface Item {
  id: number;
  name: string;
  images: { src: string }[];
  condition: "New" | "Good" | "Worn Out" | "Broken";
  status: "Available" | "Damaged" | "Borrowed";
  description: string;
}

export const items: Item[] = [
  {
    id: 1,
    name: "Laptop",
    images: [laptop, laptop1, laptop2, laptop3],
    condition: "New",
    status: "Available",
    description: "Portable computer for all your needs.",
  },
  {
    id: 2,
    name: "Monitor",
    images: [monitor, monitor1, monitor2],
    condition: "Good",
    status: "Borrowed",
    description: "High-resolution display for work or play.",
  },
  {
    id: 3,
    name: "Table",
    images: [table, table1, table2, table3],
    condition: "Worn Out",
    status: "Available",
    description: "Sturdy table perfect for work or dining.",
  },
  {
    id: 4,
    name: "Chair",
    images: [chair, chair1, chair2],
    condition: "Broken",
    status: "Damaged",
    description: "Comfortable chair for long hours of sitting.",
  },
  {
    id: 5,
    name: "Broom",
    images: [bloom, bloom1, bloom2, bloom3],
    condition: "Good",
    status: "Available",
    description: "For cleaning your floors and surfaces.",
  },
  {
    id: 6,
    name: "Mop",
    images: [mop, mop1, mop2],
    condition: "New",
    status: "Available",
    description: "Essential for wet cleaning and mopping.",
  },
  {
    id: 7,
    name: "Plate",
    images: [plate, plate1, plate2, plate3],
    condition: "Good",
    status: "Borrowed",
    description: "For serving your food in style.",
  },
  {
    id: 8,
    name: "Cup",
    images: [cup, cup1, cup2, cup3],
    condition: "Worn Out",
    status: "Available",
    description: "For your morning coffee or tea.",
  },
];

export const users = [
  {
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+123456789",
    email: "john.doe@example.com",
    nationalId: "12345678",
    role: "Admin",
  },
  {
    firstName: "Alice",
    lastName: "Smith",
    phoneNumber: "+987654321",
    email: "alice.smith@example.com",
    nationalId: "87654321",
    role: "Trainer",
  },
  {
    firstName: "Bob",
    lastName: "Williams",
    phoneNumber: "+444555666",
    email: "bob.williams@example.com",
    nationalId: "44556677",
    role: "Trainee",
  },
];

export const borrowers = [
  {
    fullName: "John Doe",
    nationalId: "1234567890",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    residenceAddress: "123 Main St, Cityville",
    item: "Screen",
    assurerName: "Jane Doe",
    assurerContact: "+0987654321",
    serial_number: "Atsg2342sd",
  },
  {
    fullName: "Alice Smith",
    nationalId: "0987654321",
    email: "alice.smith@example.com",
    phoneNumber: "+1122334455",
    residenceAddress: "456 Elm St, Townsville",
    item: "Laptop",
    assurerName: "Robert Smith",
    assurerContact: "+1122334456",
    serial_number: "Atsg2342sd",
  },
];
