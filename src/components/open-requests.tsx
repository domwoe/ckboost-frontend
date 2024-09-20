'use client'

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const openRequests = [
  {
    id: 1,
    timestamp: '2023-12-01T10:30:00Z',
    transaction: '3a1b9e330d32fef1ee42f8e86420d2be41d925af2d65d835668ff7351b8a3e33',
    amount: 100000000, // 1 ckBTC = 100,000,000 sats
    bounty: 5000000,   // 5% of 100,000,000
  },
  {
    id: 2,
    timestamp: '2023-12-02T14:45:00Z',
    transaction: '4b7f3c2e1d0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4',
    amount: 50000000,  // 0.5 ckBTC
    bounty: 2500000,   // 5% of 50,000,000
  },
  {
    id: 3,
    timestamp: '2023-12-03T09:15:00Z',
    transaction: '5c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c',
    amount: 200000000, // 2 ckBTC
    bounty: 10000000,  // 5% of 200,000,000
  },
  {
    id: 4,
    timestamp: '2023-12-04T16:20:00Z',
    transaction: '6d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
    amount: 150000000, // 1.5 ckBTC
    bounty: 7500000,   // 5% of 150,000,000
  },
  {
    id: 5,
    timestamp: '2023-12-05T11:00:00Z',
    transaction: '7e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e',
    amount: 80000000,  // 0.8 ckBTC
    bounty: 4000000,   // 5% of 80,000,000
  },
];

export default function OpenRequests() {
  const formatSats = (sats: number) => {
    return `${(sats / 100000000).toFixed(8)} ckBTC`;
  };

  const getTransactionLink = (txid: string) => {
    return `https://mempool.space/tx/${txid}`;
  };

  return (
    <section className="bg-black text-white py-12 sm:py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center tracking-wide">
          Open boost requests
        </h2>
        <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
          <ScrollArea className="h-[calc(100vh-350px)] sm:h-[calc(100vh-400px)] rounded-md border border-gray-700">
            <Table>
            <TableHeader>
                  <TableRow className="bg-gray-800">
                  <TableHead className="text-gray-300">Wen?</TableHead>
                    <TableHead className="text-gray-300">Transaction</TableHead>
                    <TableHead className="text-gray-300 hidden sm:table-cell">
                      Amount
                    </TableHead>
                    <TableHead className="text-gray-300 hidden md:table-cell">
                      Bounty
                    </TableHead>
                    <TableHead className="text-right text-gray-300">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {openRequests.map((request, index) => (
                    <TableRow
                      key={request.id}
                      className={
                        index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                      }
                    >
                      <TableCell suppressHydrationWarning className="font-medium text-blue-400">
                        {new Date(request.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-green-400">
                        <a href={getTransactionLink(request.transaction)} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {`${request.transaction.slice(0, 8)}...${request.transaction.slice(-8)}`}
                        </a>
                      </TableCell>
                      <TableCell className="text-yellow-400 hidden sm:table-cell">
                        {formatSats(request.amount)}
                      </TableCell>
                      <TableCell className="text-purple-400 hidden md:table-cell">
                        {formatSats(request.bounty)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white"
                        >
                          Boost
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
}