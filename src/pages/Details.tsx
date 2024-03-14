import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardTitle, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonModal, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { DetailsResult, useApi } from '../hooks/useApi';
import { bodyOutline, clipboardOutline, starHalfOutline, trophyOutline } from 'ionicons/icons';

interface DetailsPageProps
    extends RouteComponentProps<{
        id: string
    }> {}

const Details: React.FC <DetailsPageProps> = ({ match }) => {
    const {getDeatils} = useApi()
    const [information, setInformation] = useState<DetailsResult | null>(null);

    useIonViewDidEnter(async () => {
        const id = match.params.id
        const data = await getDeatils(id)
        setInformation(data)
        console.log('file: Details.tsx:26 useIonViewWillEnter data' ,data)
    })
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/movies'></IonBackButton>
                    </IonButtons>
                    <IonTitle>{information?.Genre}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                {information &&(
                <IonCard>
                    <IonHeader>
                        <IonCardTitle>{information.Title}</IonCardTitle>
                        <IonCardTitle>{information.Year}</IonCardTitle>
                    </IonHeader>
                    <IonCardContent>
                        <IonImg src={information.Poster}></IonImg>

                        <IonItem lines="none">
                            <IonIcon icon={starHalfOutline} slot='start' color='warning'></IonIcon>
                            <IonLabel>{information.imdbRating}</IonLabel>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                )}


                <IonModal trigger='open-modal' initialBreakpoint={0.25} breakpoints={[0, 0.25, 0.5, 0.75]}>
                    <IonContent className='ion-padding'>
                        <IonItem lines='none'>
                            <IonIcon icon={clipboardOutline} slot='start'></IonIcon>
                            <IonLabel>{information?.Director}</IonLabel>
                        </IonItem>

                        <IonItem lines='none'>
                            <IonIcon icon={bodyOutline} slot='start'></IonIcon>
                            <IonLabel className='ion-text-wrap'>{information?.Actors}</IonLabel>
                        </IonItem>

                        <IonItem lines='none'>
                            <IonIcon icon={trophyOutline} slot='start'></IonIcon>
                            <IonLabel className='ion-text-wrap'>{information?.Awards}</IonLabel>
                        </IonItem>

                        <p className='ion-padding'>{information?.Plot}</p>
                    </IonContent>
                </IonModal>
            </IonContent>

            <IonFooter>
                <IonButton expand='full' id='open-modal'>
                    Show more
                </IonButton>
            </IonFooter>
        </IonPage>
    );
};

export default Details;