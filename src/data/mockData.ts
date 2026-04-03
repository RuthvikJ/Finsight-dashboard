// src/data/mockData.ts

import type { Transaction, TransactionCategory } from '../types'

const id = (n: number) => `txn-${String(n).padStart(3, '0')}`

const d = (date: string): string => date

export const mockTransactions: Transaction[] = [

    // ── JANUARY ──────────────────────────────────────────
    { id: id(1), date: d('2025-01-01'), amount: 58000, type: 'income', category: 'Salary', description: 'January salary' },
    { id: id(2), date: d('2025-01-03'), amount: 1200, type: 'expense', category: 'Food & Dining', description: 'Grocery run' },
    { id: id(3), date: d('2025-01-05'), amount: 499, type: 'expense', category: 'Entertainment', description: 'Netflix subscription' },
    { id: id(4), date: d('2025-01-07'), amount: 350, type: 'expense', category: 'Transport', description: 'Ola rides' },
    { id: id(5), date: d('2025-01-10'), amount: 2400, type: 'expense', category: 'Shopping', description: 'Winter clothes' },
    { id: id(6), date: d('2025-01-12'), amount: 800, type: 'expense', category: 'Food & Dining', description: 'Team lunch' },
    { id: id(7), date: d('2025-01-14'), amount: 5000, type: 'expense', category: 'Housing', description: 'Rent payment' },
    { id: id(8), date: d('2025-01-15'), amount: 8500, type: 'income', category: 'Freelance', description: 'UI design project' },
    { id: id(9), date: d('2025-01-18'), amount: 650, type: 'expense', category: 'Utilities', description: 'Electricity bill' },
    { id: id(10), date: d('2025-01-20'), amount: 420, type: 'expense', category: 'Food & Dining', description: 'Swiggy orders' },
    { id: id(11), date: d('2025-01-22'), amount: 1500, type: 'expense', category: 'Healthcare', description: 'Pharmacy' },
    { id: id(12), date: d('2025-01-25'), amount: 990, type: 'expense', category: 'Shopping', description: 'Amazon order' },
    { id: id(13), date: d('2025-01-28'), amount: 300, type: 'expense', category: 'Transport', description: 'Petrol' },
    { id: id(14), date: d('2025-01-30'), amount: 3000, type: 'income', category: 'Investment', description: 'Dividend credit' },

    // ── FEBRUARY ─────────────────────────────────────────
    { id: id(15), date: d('2025-02-01'), amount: 58000, type: 'income', category: 'Salary', description: 'February salary' },
    { id: id(16), date: d('2025-02-02'), amount: 1100, type: 'expense', category: 'Food & Dining', description: 'Grocery run' },
    { id: id(17), date: d('2025-02-04'), amount: 499, type: 'expense', category: 'Entertainment', description: 'Netflix subscription' },
    { id: id(18), date: d('2025-02-06'), amount: 280, type: 'expense', category: 'Transport', description: 'Metro card recharge' },
    { id: id(19), date: d('2025-02-08'), amount: 3200, type: 'expense', category: 'Shopping', description: 'Valentine gifts' },
    { id: id(20), date: d('2025-02-10'), amount: 750, type: 'expense', category: 'Food & Dining', description: 'Restaurant dinner' },
    { id: id(21), date: d('2025-02-12'), amount: 5000, type: 'expense', category: 'Housing', description: 'Rent payment' },
    { id: id(22), date: d('2025-02-14'), amount: 1200, type: 'expense', category: 'Food & Dining', description: 'Valentine dinner' },
    { id: id(23), date: d('2025-02-16'), amount: 600, type: 'expense', category: 'Utilities', description: 'Internet bill' },
    { id: id(24), date: d('2025-02-18'), amount: 12000, type: 'income', category: 'Freelance', description: 'React dashboard project' },
    { id: id(25), date: d('2025-02-20'), amount: 890, type: 'expense', category: 'Healthcare', description: 'Doctor consultation' },
    { id: id(26), date: d('2025-02-22'), amount: 1800, type: 'expense', category: 'Shopping', description: 'Myntra sale' },
    { id: id(27), date: d('2025-02-25'), amount: 400, type: 'expense', category: 'Food & Dining', description: 'Zomato orders' },
    { id: id(28), date: d('2025-02-27'), amount: 320, type: 'expense', category: 'Transport', description: 'Rapido rides' },

    // ── MARCH ────────────────────────────────────────────
    { id: id(29), date: d('2025-03-01'), amount: 58000, type: 'income', category: 'Salary', description: 'March salary' },
    { id: id(30), date: d('2025-03-03'), amount: 1350, type: 'expense', category: 'Food & Dining', description: 'Grocery run' },
    { id: id(31), date: d('2025-03-05'), amount: 499, type: 'expense', category: 'Entertainment', description: 'Netflix subscription' },
    { id: id(32), date: d('2025-03-06'), amount: 199, type: 'expense', category: 'Entertainment', description: 'Spotify premium' },
    { id: id(33), date: d('2025-03-08'), amount: 450, type: 'expense', category: 'Transport', description: 'Ola rides' },
    { id: id(34), date: d('2025-03-10'), amount: 5000, type: 'expense', category: 'Housing', description: 'Rent payment' },
    { id: id(35), date: d('2025-03-12'), amount: 4500, type: 'expense', category: 'Shopping', description: 'Holi shopping' },
    { id: id(36), date: d('2025-03-14'), amount: 680, type: 'expense', category: 'Utilities', description: 'Electricity bill' },
    { id: id(37), date: d('2025-03-15'), amount: 6000, type: 'income', category: 'Freelance', description: 'Logo design gig' },
    { id: id(38), date: d('2025-03-17'), amount: 920, type: 'expense', category: 'Food & Dining', description: 'Holi celebration lunch' },
    { id: id(39), date: d('2025-03-19'), amount: 2200, type: 'expense', category: 'Healthcare', description: 'Annual checkup' },
    { id: id(40), date: d('2025-03-21'), amount: 1100, type: 'expense', category: 'Shopping', description: 'Books and stationery' },
    { id: id(41), date: d('2025-03-24'), amount: 560, type: 'expense', category: 'Food & Dining', description: 'Swiggy orders' },
    { id: id(42), date: d('2025-03-27'), amount: 5000, type: 'income', category: 'Investment', description: 'Mutual fund return' },
    { id: id(43), date: d('2025-03-29'), amount: 380, type: 'expense', category: 'Transport', description: 'Petrol' },

    // ── APRIL ────────────────────────────────────────────
    { id: id(44), date: d('2025-04-01'), amount: 61000, type: 'income', category: 'Salary', description: 'April salary — increment' },
    { id: id(45), date: d('2025-04-03'), amount: 1400, type: 'expense', category: 'Food & Dining', description: 'Grocery run' },
    { id: id(46), date: d('2025-04-05'), amount: 499, type: 'expense', category: 'Entertainment', description: 'Netflix subscription' },
    { id: id(47), date: d('2025-04-07'), amount: 5000, type: 'expense', category: 'Housing', description: 'Rent payment' },
    { id: id(48), date: d('2025-04-09'), amount: 6800, type: 'expense', category: 'Shopping', description: 'Summer wardrobe' },
    { id: id(49), date: d('2025-04-11'), amount: 700, type: 'expense', category: 'Utilities', description: 'Water and electricity' },
    { id: id(50), date: d('2025-04-13'), amount: 480, type: 'expense', category: 'Transport', description: 'Cab rides' },
    { id: id(51), date: d('2025-04-15'), amount: 9000, type: 'income', category: 'Freelance', description: 'Mobile app UI project' },
    { id: id(52), date: d('2025-04-17'), amount: 1600, type: 'expense', category: 'Food & Dining', description: 'Birthday dinner' },
    { id: id(53), date: d('2025-04-19'), amount: 3500, type: 'expense', category: 'Healthcare', description: 'Dental treatment' },
    { id: id(54), date: d('2025-04-22'), amount: 750, type: 'expense', category: 'Food & Dining', description: 'Zomato orders' },
    { id: id(55), date: d('2025-04-25'), amount: 2100, type: 'expense', category: 'Shopping', description: 'Electronics accessories' },
    { id: id(56), date: d('2025-04-28'), amount: 350, type: 'expense', category: 'Transport', description: 'Metro recharge' },

    // ── MAY ──────────────────────────────────────────────
    { id: id(57), date: d('2025-05-01'), amount: 61000, type: 'income', category: 'Salary', description: 'May salary' },
    { id: id(58), date: d('2025-05-02'), amount: 1300, type: 'expense', category: 'Food & Dining', description: 'Grocery run' },
    { id: id(59), date: d('2025-05-04'), amount: 499, type: 'expense', category: 'Entertainment', description: 'Netflix subscription' },
    { id: id(60), date: d('2025-05-06'), amount: 199, type: 'expense', category: 'Entertainment', description: 'Spotify premium' },
    { id: id(61), date: d('2025-05-07'), amount: 5000, type: 'expense', category: 'Housing', description: 'Rent payment' },
    { id: id(62), date: d('2025-05-09'), amount: 420, type: 'expense', category: 'Transport', description: 'Ola rides' },
    { id: id(63), date: d('2025-05-11'), amount: 900, type: 'expense', category: 'Utilities', description: 'AC electricity spike' },
    { id: id(64), date: d('2025-05-13'), amount: 14000, type: 'income', category: 'Freelance', description: 'Branding project' },
    { id: id(65), date: d('2025-05-15'), amount: 5500, type: 'expense', category: 'Shopping', description: 'Amazon Prime sale' },
    { id: id(66), date: d('2025-05-17'), amount: 880, type: 'expense', category: 'Food & Dining', description: 'Weekend dining out' },
    { id: id(67), date: d('2025-05-20'), amount: 650, type: 'expense', category: 'Healthcare', description: 'Pharmacy' },
    { id: id(68), date: d('2025-05-23'), amount: 1900, type: 'expense', category: 'Shopping', description: 'Gadget purchase' },
    { id: id(69), date: d('2025-05-26'), amount: 4000, type: 'income', category: 'Investment', description: 'Stock dividend' },
    { id: id(70), date: d('2025-05-28'), amount: 530, type: 'expense', category: 'Food & Dining', description: 'Swiggy orders' },
    { id: id(71), date: d('2025-05-30'), amount: 410, type: 'expense', category: 'Transport', description: 'Petrol' },

    // ── JUNE ─────────────────────────────────────────────
    { id: id(72), date: d('2025-06-01'), amount: 61000, type: 'income', category: 'Salary', description: 'June salary' },
    { id: id(73), date: d('2025-06-02'), amount: 1250, type: 'expense', category: 'Food & Dining', description: 'Grocery run' },
    { id: id(74), date: d('2025-06-04'), amount: 499, type: 'expense', category: 'Entertainment', description: 'Netflix subscription' },
    { id: id(75), date: d('2025-06-06'), amount: 5000, type: 'expense', category: 'Housing', description: 'Rent payment' },
    { id: id(76), date: d('2025-06-08'), amount: 390, type: 'expense', category: 'Transport', description: 'Cab rides' },
    { id: id(77), date: d('2025-06-10'), amount: 720, type: 'expense', category: 'Utilities', description: 'Electricity bill' },
    { id: id(78), date: d('2025-06-12'), amount: 10500, type: 'income', category: 'Freelance', description: 'SaaS landing page' },
    { id: id(79), date: d('2025-06-14'), amount: 3800, type: 'expense', category: 'Shopping', description: 'Flipkart sale' },
    { id: id(80), date: d('2025-06-16'), amount: 960, type: 'expense', category: 'Food & Dining', description: 'Friends dinner' },
    { id: id(81), date: d('2025-06-18'), amount: 1100, type: 'expense', category: 'Healthcare', description: 'Eye checkup + glasses' },
    { id: id(82), date: d('2025-06-21'), amount: 640, type: 'expense', category: 'Food & Dining', description: 'Zomato orders' },
    { id: id(83), date: d('2025-06-24'), amount: 2600, type: 'expense', category: 'Shopping', description: 'Home decor' },
    { id: id(84), date: d('2025-06-26'), amount: 480, type: 'expense', category: 'Transport', description: 'Metro recharge' },
    { id: id(85), date: d('2025-06-28'), amount: 3500, type: 'income', category: 'Investment', description: 'FD interest credit' },
    { id: id(86), date: d('2025-06-30'), amount: 750, type: 'expense', category: 'Food & Dining', description: 'Month end grocery' },
]

export const CATEGORIES: TransactionCategory[] = [
    'Food & Dining',
    'Transport',
    'Shopping',
    'Entertainment',
    'Healthcare',
    'Utilities',
    'Housing',
    'Salary',
    'Freelance',
    'Investment',
    'Other',
]

export const MONTHS = [
    { value: '2025-01', label: 'January' },
    { value: '2025-02', label: 'February' },
    { value: '2025-03', label: 'March' },
    { value: '2025-04', label: 'April' },
    { value: '2025-05', label: 'May' },
    { value: '2025-06', label: 'June' },
]