import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  TabsContainer,
  type TabRouteConfig,
} from '@apps/shared/containers/tabs';

const ITEMS = Array.from({ length: 4 }, (_, i) => ({
  id: `${i}`,
  text: `Item ${i + 1}`,
}));

function InvertedListScreen() {
  return (
    <FlatList
      inverted
      data={ITEMS}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.text}</Text>
        </View>
      )}
    />
  );
}

const Stack = createNativeStackNavigator();

function StackTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={InvertedListScreen} />
    </Stack.Navigator>
  );
}

function InfoTab() {
  return (
    <View style={styles.center}>
      <Text>
        Turn on Settings → Accessibility → Display & Text Size → Reduce
        Transparency, then open the List tab.
      </Text>
    </View>
  );
}

const ROUTE_CONFIGS: TabRouteConfig[] = [
  {
    name: 'Info',
    element: <InfoTab />,
    options: {
      title: 'Info',
      ios: { icon: { type: 'sfSymbol', name: 'info.circle' } },
    },
  },
  {
    name: 'ListTab',
    element: <StackTab />,
    options: {
      title: 'List',
      ios: { icon: { type: 'sfSymbol', name: 'list.bullet' } },
    },
  },
];

export default function TestReduceTransparencyEdgeEffect() {
  return (
    <NavigationContainer>
      <TabsContainer routeConfigs={ROUTE_CONFIGS} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  item: {
    margin: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#dde3eb',
    alignSelf: 'flex-start',
  },
});
