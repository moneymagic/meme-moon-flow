
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { replicateTrade } from '@/services/CopyTradeExecutor';
import { useForm } from 'react-hook-form';

interface TestPanelFormValues {
  token: string;
  operation: 'buy' | 'sell';
  amount: number;
  entryPrice: number;
  exitPrice: number;
  masterTotalCapital: number;
}

export function CopyTradeTestPanel() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLog, setExecutionLog] = useState<string[]>([]);

  const form = useForm<TestPanelFormValues>({
    defaultValues: {
      token: 'SOL/USDC',
      operation: 'buy',
      amount: 1,
      entryPrice: 100,
      exitPrice: 110,
      masterTotalCapital: 10
    }
  });

  const addToLog = (message: string) => {
    setExecutionLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const executeTradeTest = async (values: TestPanelFormValues) => {
    setIsExecuting(true);
    addToLog(`Starting test execution with token: ${values.token}`);

    try {
      // Create a console.log interceptor to capture logs
      const originalConsoleLog = console.log;
      const logs: string[] = [];
      
      console.log = (...args) => {
        originalConsoleLog(...args);
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      };

      // Execute the trade replication
      await replicateTrade({
        token: values.token,
        operation: values.operation,
        amount: values.amount,
        entryPrice: values.entryPrice,
        exitPrice: values.exitPrice,
        masterTotalCapital: values.masterTotalCapital
      });

      // Restore original console.log
      console.log = originalConsoleLog;
      
      // Add captured logs to our display log
      logs.forEach(log => addToLog(log));
      
      toast.success("Trade replication test executed successfully");
    } catch (error) {
      console.error("Error executing trade test:", error);
      addToLog(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
      toast.error("Failed to execute trade replication test");
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="border rounded-lg p-6 bg-background shadow-sm">
      <h2 className="text-xl font-bold mb-4">Copy Trade Test Panel</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(executeTradeTest)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token</FormLabel>
                  <FormControl>
                    <Input placeholder="SOL/USDC" {...field} />
                  </FormControl>
                  <FormDescription>Token pair for the trade</FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="operation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operation</FormLabel>
                  <FormControl>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                    >
                      <option value="buy">Buy</option>
                      <option value="sell">Sell</option>
                    </select>
                  </FormControl>
                  <FormDescription>Type of operation</FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (SOL)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                    />
                  </FormControl>
                  <FormDescription>Amount traded by master</FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="masterTotalCapital"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Master Total Capital (SOL)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                    />
                  </FormControl>
                  <FormDescription>Master's total capital</FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="entryPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entry Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                    />
                  </FormControl>
                  <FormDescription>Entry price</FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="exitPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exit Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                    />
                  </FormControl>
                  <FormDescription>Exit price</FormDescription>
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" disabled={isExecuting}>
            {isExecuting ? "Executing..." : "Execute Trade Test"}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Execution Log:</h3>
        <div className="bg-muted p-4 rounded-md h-80 overflow-y-auto font-mono text-xs">
          {executionLog.length === 0 ? (
            <p className="text-muted-foreground">No logs yet. Execute a test to see results here.</p>
          ) : (
            executionLog.map((log, index) => (
              <div key={index} className="mb-1">
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
