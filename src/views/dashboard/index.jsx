import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import Chart from 'react-apexcharts';
import ChatBot, { Button } from "react-chatbotify";
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';

import { gridSpacing } from 'store/constant';
import Log from "../../assets/images/logo.svg";
import InventoryIcon from '@mui/icons-material/Inventory';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import MainCard from 'ui-component/cards/MainCard';
import { Typography } from '@mui/material';
import PopularCardFeedBack from './pupfeedpask';
import { Navigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://bu-fos-mastermind.solutions-apps.com/ai/socerMore')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const QuestionResponseFlowMap = () => {
    const series = [{ name: 'Correct', data: [45, 20, 15, 20] }, { name: 'Ambiguous', data: [20, 10, 15, 5] }, { name: 'Unanswered', data: [10, 5, 10, 5] }];
    const options = { chart: { type: 'bar', height: 350 }, xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4'] } };
    return (
      <>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="subtitle2">Correct</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Chart options={options} series={series} type="bar" height={350} />
        </Grid>
      </>
    ); 
  };

  const SentimentAnalysis = () => {
    const series = [{ name: 'Sentiment', data: [70, 20, 10] }];
    const options = { chart: { type: 'bar', height: 350 }, xaxis: { categories: ['Positive', 'Negative', 'Neutral'] } };
    return (
      <>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="subtitle2">Sentiment</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Chart options={options} series={series} type="bar" height={350} />
        </Grid>
      </>
    ); 
  };

  const TopicClusters = () => {
    const series = [{ name: 'Topics', data: [35, 30, 25, 20] }];
    const options = { chart: { type: 'bubble', height: 350 }, xaxis: { categories: ['Topic A', 'Topic B', 'Topic C', 'Topic D'] } };
    return (
      <>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="subtitle2">Topics</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Chart options={options} series={series} type="bubble" height={350} />
        </Grid>
      </>
    ); 
  };

  const QuestionsTrendAnalysis = () => {
    const series = [{ name: 'Questions', data: [20, 30, 50, 40, 60] }];
    const options = { chart: { type: 'line', height: 350 }, xaxis: { categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'] } };
    return (
      <>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="subtitle2">Questions</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Chart options={options} series={series} type="line" height={350} />
        </Grid>
      </>
    );
  };

  const ComplexityResponseTime = () => {
    const series = [{ name: 'Complexity', data: [5, 10, 15, 20] }];
    const options = { chart: { type: 'scatter', height: 350 }, xaxis: { categories: ['Low', 'Medium', 'High'] } };
    return (
      <>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="subtitle2">Complexity</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Chart options={options} series={series} type="scatter" height={350} />
        </Grid>
      </>
    );
  };

  const charts = {
    chartOne: QuestionResponseFlowMap,
    chartTwo: SentimentAnalysis,
    chartThree: TopicClusters,
    chartFour: QuestionsTrendAnalysis,
    chartFive: ComplexityResponseTime,
  };
  const flow = {
    "start": {
        message: "Hello there!",
        path: "end"
    },
    "end": {
        message: "See you, goodbye!"
    }
  }
  const DefaultSettings = {
    general: {
      primaryColor: "#42b0c5",
      secondaryColor: "#491d8d",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', " +
        "'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', " +
        "sans-serif",
      showHeader: true,
      showFooter: true,
      showInputRow: true,
      embedded: false,
      flowStartTrigger: "ON_LOAD",
    },
    tooltip: {
      mode: "CLOSE",
      text: "Talk to me! 😊",
    },
    chatButton: {
      icon: Log,
    },
    header: {
      title: (
        <div style={{cursor: "pointer", margin: 0, fontSize: 20, fontWeight: "bold"}} onClick={
          () => window.open("https://github.com/tjtanjin/")
        }>
          Alfa Laval
        </div>
      ),
      showAvatar: true,
    
     
    },

    chatHistory: {
      disabled: false,
      maxEntries: 30,
      storageKey: "rcb-history",
      storageType: "LOCAL_STORAGE",
      viewChatHistoryButtonText: "Load Chat History ⟳",
      chatHistoryLineBreakText: "----- Previous Chat History -----",
      autoLoad: false,
    },
    chatInput: {
      disabled: false,
      allowNewline: false,
      enabledPlaceholderText: "Type your message...",
      disabledPlaceholderText: "",
      showCharacterCount: false,
      characterLimit: -1,
      botDelay: 1000,
       
      blockSpam: true,
      sendOptionOutput: true,
      sendCheckboxOutput: true,
    },
    chatWindow: {
      showScrollbar: false,
      autoJumpToBottom: false,
      showMessagePrompt: true,
      messagePromptText: "New Messages ↓",
      messagePromptOffset: 30,
      defaultOpen: false,
    },
    sensitiveInput: {
      maskInTextArea: true,
      maskInUserBubble: true,
      asterisksCount: 10,
      hideInUserBubble: false,
    },
    userBubble: {
      animate: true,
      showAvatar: false,
      simStream: false,
      streamSpeed: 30,
      dangerouslySetInnerHtml: false,
    },
    botBubble: {
      animate: true,
      showAvatar: false,
      // avatar: botAvatar,
      simStream: false,
      streamSpeed: 30,
      dangerouslySetInnerHtml: false,
    },
    voice: {
      disabled: true,
      defaultToggledOn: false,
      language: "en-US",
      timeoutPeriod: 10000,
      autoSendDisabled: false,
      autoSendPeriod: 1000,
      sendAsAudio: false,
    },
    footer: {
      text: (
        <div style={{cursor: "pointer", display: "flex", flexDirection: "row", alignItems: "center", columnGap: 3}} 
          onClick={() => window.open("https://react-chatbotify.com")}
        >
          <span key={0}></span>
          <div
            key={1}
            style={{
              borderRadius: "50%",
              width: 14,
              height: 14,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "linear-gradient(to right, #42b0c5, #491d8d)",
            }}
          >
            {/* <Log /> */}
          </div>
          <span key={2} style={{fontWeight: "bold"}}> </span>
        </div>
      ),
      buttons: [Button.FILE_ATTACHMENT_BUTTON, Button.EMOJI_PICKER_BUTTON]
    },
    fileAttachment: {
      disabled: false,
      multiple: true,
      accept: ".png",

      sendFileName: true,
      showMediaDisplay: false,
    },
    emoji: {
      disabled: false,
      list: ["😀", "😃", "😄", "😅", "😊", "😌", "😇", "🙃", "🤣", "😍", "🥰", "🥳", "🎉", "🎈", "🚀", "⭐️"]
    },
    toast: {
      maxCount: 3,
      forbidOnMax: false,
      dismissOnClick: true,
    },
    event: {
      rcbPreInjectMessage: false,
      rcbPostInjectMessage: false,
      rcbStartStreamMessage: false,
      rcbChunkStreamMessage: false,
      rcbStopStreamMessage: false,
      rcbRemoveMessage: false,
      rcbLoadChatHistory: false,
      rcbToggleChatWindow: false,
      rcbToggleAudio: false,
      rcbToggleNotifications: false,
      rcbToggleVoice: false,
      rcbChangePath: false,
      rcbShowToast: false,
      rcbDismissToast: false,
      rcbUserSubmitText: false,
      rcbUserUploadFile: false,
      rcbTextAreaChangeValue: false,
      rcbPreLoadChatBot: false,
      rcbPostLoadChatBot: false,
    },
    ariaLabel: {
      chatButton: "open chat",
      audioButton: "toggle audio",
      closeChatButton: "close chat",
      emojiButton: "emoji picker",
      fileAttachmentButton: "upload file",
      notificationButton: "toggle notifications",
      sendButton: "send message",
      voiceButton: "toggle voice",
      inputTextArea: "input text area",
    },
    device: {
      desktopEnabled: true,
      mobileEnabled: true,
      applyMobileOptimizations: true,
    }
  }
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard
                  {...{
                    isLoading: isLoading,
                    total: 403,
                    label: 'Remaining Document Amount.',
                    icon: <InventoryIcon fontSize="inherit" />
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
            <div style={{height:15}}/>
            <PopularCardFeedBack isLoading={isLoading} />
          </Grid>
          
        </Grid>
        <div style={{height:15}}/>

        <Grid container spacing={5}>
          {data && typeof data === 'object' ? (
            Object.values(charts).map((ChartComponent, index) => (
              <Grid item md={6} key={index}>
                <MainCard>
                  <Grid container spacing={gridSpacing}>
                    <ChartComponent />
                  </Grid>
                </MainCard>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} md={8}>
             <SkeletonTotalGrowthBarChart />
          </Grid>
           
          )}
        </Grid>
      </Grid>
      <ChatBot flow={flow} settings={DefaultSettings} />

    </Grid>
  );
};

export default Dashboard;
