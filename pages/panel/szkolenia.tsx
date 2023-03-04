import {ReactNode, useEffect, useState} from "react";
import PanelLayout from "../../components/panelLayout/panelLayout";
import directusApi from "../../libs/api";
import Tag from "../../components/trainingCard/tag";
import TrainingCard from "../../components/tag/trainingCard";
type user = {
    userID: string;
    discordTag: string;
    accountActive: boolean;
    role: string;
    rankData: {
        rank: string;
        corps: string;
        number: number;
        promotion: boolean;
        currentNumber: number;
        positiveRecommendations: Array<Record<string, string>>;
        negativeRecommendations: Array<Record<string, string>>;
    };
};
const Szkolenia = ({ user }: { user: user }) => {
    const [training, setTraining] = useState(null)
    useEffect(() => {
        directusApi.get('trainings?populate=*').then((res) => {
            // console.log(res.data[0].attributes.image.data.attributes.url)
            setTraining(res.data.map((o) => {
                return {
                    id: o.attributes.id,
                    title: o.attributes.title,
                    shortDescription: o.attributes.description,
                    fullDescription: o.attributes.fullDescription,
                    range: o.attributes.training_ranges.data.map((i) => i.attributes.title),
                }
            }))
        });
    },[])
    return (
        <>
                    {training && training?.map((o) => (
                        <TrainingCard title={o.title} key={o.id} tags={o.range} className={`xs:col-span-1 lg:col-span-3 xl:col-span-4 break-words`}>
                            {o.shortDescription}
                        </TrainingCard>
                    ))}

        </>
    );
};
export default Szkolenia;

Szkolenia.getLayout = function getLayout(page: ReactNode) {
    return <PanelLayout>{page}</PanelLayout>;
};