/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Tag from "../trainingCard/tag";
import {Card} from "flowbite-react";
type Props = {
  title: string;
  tags?: string[];
  children: React.ReactNode;
  className?: string;
  [x: string]: any;
};
const TrainingCard: React.FC<Props> = ({ children, title, tags, className, props }) => {
    const amountShown = 5;
    const tagsToShow = tags?.slice(0,amountShown);
    const leftoverTags = tags?.length - amountShown;
  return (
          <Card className={className}>
              <p className="text-2xl border-b-2 border-b-gray-700 border-solid break-words">{title}</p>
              <p className="text-gray-400 sm:max-w-sm md:max-w-md">
                  {children}
              </p>
              <div className="mt-auto pt-6">
                  {tagsToShow && tagsToShow.map((tag,index) => (
                      <Tag name={tag} key={index}/>
                  ))}
                  {leftoverTags > 0 && <Tag name={"+"+leftoverTags+" więcej"} />}
              </div>
          </Card>
  );
};

export default TrainingCard;
