import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Copy, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePrompt = () => {
    if (!input.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter some text to generate a prompt',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const enhancedPrompt = `Act as an expert in ${input}. Provide detailed, comprehensive information about this topic, including best practices, common pitfalls, and advanced techniques. Format your response with clear headings and bullet points when appropriate.`;
      setOutput(enhancedPrompt);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: 'Copied!',
      description: 'Prompt copied to clipboard',
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">AI Prompt Generator</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Create Your Prompt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input">What kind of prompt do you need?</Label>
              <Textarea
                id="input"
                placeholder="e.g., 'a marketing expert', 'a Python developer', 'a fitness trainer'"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            
            <Button onClick={generatePrompt} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Prompt'
              )}
            </Button>
          </CardContent>
        </Card>

        {output && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Generated Prompt</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="text-muted-foreground"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">
                {output}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;