import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, Any
import os

class PortfolioAnalytics:
    """Simple analytics for the portfolio chatbot."""
    
    def __init__(self, log_dir: str = "logs"):
        self.log_dir = Path(log_dir)
        self.log_dir.mkdir(exist_ok=True)
        self.analytics_file = self.log_dir / "analytics.json"
        self.conversations_file = self.log_dir / "conversations.json"
        
    def log_conversation_start(self):
        """Log when a new conversation starts."""
        self._update_analytics("conversation_starts", 1)
        
    def log_message(self, user_message: str, response_length: int):
        """Log a message exchange."""
        self._update_analytics("total_messages", 1)
        self._update_analytics("total_response_chars", response_length)
        
        # Log conversation data
        conversation_data = {
            "timestamp": datetime.now().isoformat(),
            "user_message_length": len(user_message),
            "response_length": response_length,
            "user_message_preview": user_message[:100] + "..." if len(user_message) > 100 else user_message
        }
        
        self._append_conversation(conversation_data)
        
    def log_error(self, error_type: str):
        """Log errors."""
        self._update_analytics(f"errors_{error_type}", 1)
        
    def get_analytics_summary(self) -> Dict[str, Any]:
        """Get analytics summary."""
        try:
            with open(self.analytics_file, 'r') as f:
                data = json.load(f)
            return data
        except FileNotFoundError:
            return {}
            
    def _update_analytics(self, metric: str, value: int):
        """Update analytics metrics."""
        try:
            with open(self.analytics_file, 'r') as f:
                data = json.load(f)
        except FileNotFoundError:
            data = {}
            
        data[metric] = data.get(metric, 0) + value
        data["last_updated"] = datetime.now().isoformat()
        
        with open(self.analytics_file, 'w') as f:
            json.dump(data, f, indent=2)
            
    def _append_conversation(self, conversation_data: Dict[str, Any]):
        """Append conversation data."""
        try:
            with open(self.conversations_file, 'r') as f:
                conversations = json.load(f)
        except FileNotFoundError:
            conversations = []
            
        conversations.append(conversation_data)
        
        # Keep only last 100 conversations for privacy
        if len(conversations) > 100:
            conversations = conversations[-100:]
            
        with open(self.conversations_file, 'w') as f:
            json.dump(conversations, f, indent=2)
