
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">InsureNexus</CardTitle>
          <CardDescription>
            End-to-End Insurance Management Platform
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6">
            Welcome to InsureNexus, the comprehensive platform for insurance companies to manage policies and claims efficiently.
          </p>
          <div className="flex flex-col gap-4">
            <Button 
              size="lg" 
              className="w-full" 
              onClick={() => navigate("/register")}
            >
              Register Your Company
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full" 
              onClick={() => navigate("/dashboard")}
            >
              Login to Dashboard
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center text-xs text-muted-foreground">
          Insurance simplified, claims streamlined.
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
