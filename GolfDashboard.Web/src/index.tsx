import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './app';

import 'devextreme/dist/css/dx.common.css';
import './css/dx.generic.custom-scheme.css';
import './css/index.css';
import { WarningPrompt } from './components/warning-prompt/warning-prompt';

const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter getUserConfirmation={(message: string, callback: (ok: boolean) => void) => ShowNavigationWarningPrompt(message, callback)} >
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

function ShowNavigationWarningPrompt(message: string, callback: (ok: boolean) => void) {

  var elem = document.createElement("div");
  elem.id = "warning-dialog-container";
  document.body.append(elem);

  var destroyDialog = (result: boolean) => {
    ReactDOM.unmountComponentAtNode(elem);
    callback(result);
  };

  ReactDOM.render(
    <WarningPrompt message={message}
      title="Confirm Navigation"
      visible={true}
      onCancel={() => destroyDialog(false)}
      onOk={() => destroyDialog(true)} />,
    elem
  );
}