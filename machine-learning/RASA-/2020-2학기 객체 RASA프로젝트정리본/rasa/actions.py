from rasa_sdk.forms import FormAction
from rasa_sdk import Action, Tracker
from typing import Any, Text, Dict, List,Union,Optional
from rasa_sdk.executor import CollectingDispather
import logging
import json
from rasa_sdk.events import SlotSet
from rasa_sdk.events import UserUtteranceReverted
from rasa_sdk.events import ConversationPaused
from rasa_sdk.events import EventType
from rasa_sdk.events import ActionExecuted
from bot import RestaurantAPI

logger=logging.getLogger(__name__)

class action_search_restaurants(Action):
    def name(self):
        return 'action_search_restaurants'

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message("looking for restaurants")
        restaurant_api = RestaurantAPI()
        restaurants = restaurant_api.search(tracker.get_slot("cuisine"))
        return [SlotSet("matches", restaurants)]


class action_suggest(Action):
    def name(self):
        return 'action_suggest'

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message("here's what I found:")
        dispatcher.utter_message(tracker.get_slot("matches"))
        dispatcher.utter_message("is it ok for you? "
                                 "hint: I'm not going to "
                                 "find anything else :)")
        return []