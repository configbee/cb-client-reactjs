# ConfigBee React SDK

The ConfigBee React SDK allows you to easily integrate ConfigBee into your React-based projects to manage configurations and feature flags dynamically.

## Installation

You can install the `configbee-react` package via npm or yarn:

```bash
npm install configbee-react
# or
yarn add configbee-react
```

## Usage

### ConfigBeeProvider and Layout Setup

Now, create a dedicated file for your ConfigBee provider component. Let's name it configbee-provider.tsx. In this file, import the necessary modules and define the ConfigbeeProvider component:

```jsx
// src/providers/configbee-provider.tsx
"use client"
import React from 'react';
import { CbWrapper } from 'configbee-react';

const ConfigbeeProvider = ({ children }:{
    children: React.ReactNode
  }) => {
  return (
    <CbWrapper
      accountId="your_account_id"
      projectId="your_project_id"
      environmentId="your_environment_id"
    >
      {children}
    </CbWrapper>
  );
};

export default ConfigbeeProvider;
```

Replace `"your_account_id"`, `"your_project_id"`, and `"your_environment_id"` with your actual ConfigBee account, project, and environment IDs.


With the ConfigbeeProvider component created, it's time to integrate it into your root component or layout file. For example, if you are using a layout component, modify it like this:

```jsx
// src/app/layout.tsx
import React from 'react';
import ConfigbeeProvider from '../providers/configbee-provider';

function Layout({ children }:{
    children: React.ReactNode
  }) {
  return (
    <html lang="en">
      <body>
        <ConfigbeeProvider>
          {children}
        </ConfigbeeProvider>
      </body>
    </html>
  );
}

export default Layout;
```

### Using ConfigBee Hooks

Use the provided hooks to access ConfigBee configurations and feature flags within your components:

```jsx
import React from 'react';
import { useCbStatus, useCbFlags } from 'configbee-react';

const MyComponent = () => {
  const cbStatus = useCbStatus();
  const { featureEnabled } = useCbFlags() as { featureEnabled?: boolean };

  return (
    <div>
      ConfigBee Status: {cbStatus}
      <br />
      Feature Flag: {featureEnabled ? 'Enabled' : 'Disabled'}
    </div>
  );
};

export default MyComponent;
```

### Available Hooks

- `useCbStatus()`: Retrieves the status of the ConfigBee configuration for the current environment.
- `useCbTargetingStatus()`: Retrieves the targeting status of the ConfigBee configuration for the current environment.
- `useCbFlags()`: Fetches feature flags from ConfigBee.
- `useCbNumbers()`: Fetches numerical values from ConfigBee.
- `useCbJsons()`: Fetches JSON configurations from ConfigBee.
- `useCbTexts()`: Fetches text-based configurations from ConfigBee.
- `useCbOperations()`: Retrieves Configbee operation functions.

#### Operation functions
- `setTargetProperties(props)`: Set/update target properties
- `unsetTargetProperties(props)`: Clear target properties


### Example usage in NextJs page
```jsx
// src/app/test/page.tsx
import React from 'react';
import {
  useCbStatus,
  useCbFlags,
  useCbNumbers,
  useCbJsons,
  useCbTexts,
} from 'configbee-react';

const TestPage = () => {
  const cbStatus = useCbStatus();
  const { isPublished } = useCbFlags() as { isPublished?: boolean };
  const { followersCount } = useCbNumbers() as { followersCount?: number };
  const { displayName } = useCbTexts() as { displayName?: string };
  const { forceUpdate } = useCbJsons() as {
    forceUpdate?: { required_version: string; is_force_update: boolean };
  };

  if (cbStatus !== "ACTIVE") {
    return "Loading...";
  }

  return (
    <>
      page component
      {cbStatus}
      <br />

      {isPublished === true ? <>it is published</> : <>it is not yet published</>}
      <br />
      Display Name: {displayName}
      <br />
      Followers Count: {followersCount}
      <br />
      Force Update:
      <br />
      ---> required_version: {forceUpdate?.required_version}
      <br />
      ---> is_force_update: {forceUpdate?.is_force_update ? "Yes" : "No"}
    </>
  );
};

export default TestPage;
```


## Targeting
Configbee allows you to define target properties to tailor configurations based on specific criteria. You can set target properties either by using setTargetProperties, unsetTargetProperties from useCbOperations hook or by passing targetProperties to CbWrapper component.

### By using operation function from useCbOperations
```jsx
import React from 'react';
import { useCbStatus, useCbTargetingStatus, useCbOperations } from 'configbee-react';

const MyComponent = () => {
  const cbStatus = useCbStatus();
  const cbTargetingStatus = useCbTargetingStatus();

  const cbOps = useCbOperations()

  const userLogin = ({userId,userName}) => {
		if(userId){
			cbOps.setTargetProperties({"userId":userId, "userName": userName})
		}
		else{
			cbOps.unsetTargetProperties()
		}
	}

  return (
    .....
  );
};

export default MyComponent;
```

## By passing targetProperties to CbWrapper component
```jsx
const ConfigbeeProvider = ({ children }:{
    children: React.ReactNode
  }) => {
  const userId = myStorage.userId
  const userName = myStorage.userName
  return (
    <CbWrapper
      accountId="your_account_id"
      projectId="your_project_id"
      environmentId="your_environment_id"
      targetProperties={{"userId":userId, "userName": userName}}
    >
      {children}
    </CbWrapper>
  );
};
```

*Note*: Target properties will be maintained between multiple page loads until the next change or setTargetProperties/unsetTargetProperties call.

## Resources
- [NOTICE](https://github.com/configbee/cb-client-reactjs/blob/main/NOTICE)
- [LICENSE](https://github.com/configbee/cb-client-reactjs/blob/main/LICENSE)

