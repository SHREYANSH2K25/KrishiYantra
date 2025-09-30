import { AlertTriangle, CheckCircle, XCircle, Leaf, Clock, Users, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DetectionResult {
  diseaseName: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  symptoms: string[];
  treatments: {
    name: string;
    type: 'natural' | 'chemical';
    feasible: boolean;
    dosage: string;
    application: string;
    icon: string;
  }[];
  prevention: string[];
  prediction: {
    untreatedSeverity: 'low' | 'medium' | 'high';
    timeframe: string;
  };
}

interface DetectionResultsProps {
  result: DetectionResult;
  onShare: () => void;
  onSaveToHistory: () => void;
}

export function DetectionResults({ result, onShare, onSaveToHistory }: DetectionResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Detection Result */}
      <Card className="border-l-4 border-l-krishi-accent-orange">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-krishi-dark mb-2">{result.diseaseName}</CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-krishi-muted">Confidence:</span>
                  <span className="font-semibold text-krishi-dark">{result.confidence}%</span>
                </div>
                <Badge className={`${getSeverityColor(result.severity)} border`}>
                  {getSeverityIcon(result.severity)}
                  <span className="ml-1 capitalize">{result.severity} Severity</span>
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-krishi-pale-green rounded-full flex items-center justify-center">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          <Progress value={result.confidence} className="h-2 mt-3" />
        </CardHeader>
      </Card>

      {/* Symptoms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Identified Symptoms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.symptoms.map((symptom, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-krishi-accent-orange rounded-full mt-2"></div>
                <span className="text-sm">{symptom}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Treatment Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-500" />
            Recommended Treatments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {result.treatments.map((treatment, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{treatment.icon}</span>
                  <div>
                    <h4 className="font-medium text-krishi-dark">{treatment.name}</h4>
                    <Badge variant={treatment.type === 'natural' ? 'default' : 'secondary'} className="text-xs">
                      {treatment.type === 'natural' ? '🌿 Natural' : '⚗️ Chemical'}
                    </Badge>
                  </div>
                </div>
                <Badge variant={treatment.feasible ? 'default' : 'destructive'}>
                  {treatment.feasible ? '✅ Feasible' : '❌ Not Suitable'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-krishi-muted">Dosage:</span>
                  <p className="mt-1">{treatment.dosage}</p>
                </div>
                <div>
                  <span className="font-medium text-krishi-muted">Application:</span>
                  <p className="mt-1">{treatment.application}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Prediction */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            AI Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-krishi-muted mb-2">If left untreated:</p>
              <div className="flex items-center gap-2">
                <span className="text-sm">Severity may increase to</span>
                <Badge className={getSeverityColor(result.prediction.untreatedSeverity)}>
                  {getSeverityIcon(result.prediction.untreatedSeverity)}
                  <span className="ml-1 capitalize">{result.prediction.untreatedSeverity}</span>
                </Badge>
                <span className="text-sm">in {result.prediction.timeframe}</span>
              </div>
            </div>
            <AlertTriangle className="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      {/* Prevention Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Prevention Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.prevention.map((tip, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onShare} variant="outline" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share Results
        </Button>
        <Button onClick={onSaveToHistory} variant="outline" className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          Send to Advisor
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Leaf className="w-4 h-4" />
          View Market Info
        </Button>
        <Button onClick={onSaveToHistory} className="flex items-center gap-2 bg-krishi-accent-orange hover:bg-orange-400">
          Save to History
        </Button>
      </div>
    </div>
  );
}