import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Education = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <h5 className="font-bold">
            Bachelor of Science in Mechanical Engineering
          </h5>
          <p>December 2018</p>
        </div>
        <div className="flex items-center gap-2 my-2">
          <Image alt="uprm logo" src="/uprm-logo.png" width={40} height={40} />
          <p>University of Puerto Rico at Mayagüez</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Education;
