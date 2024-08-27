import torch
import torch.nn as nn
import torch.optim as optim

class AnimeModel(nn.Module):
    def __init__(self, input_dim, num_classes):
        super(AnimeModel, self).__init__()
        self.fc1 = nn.Linear(input_dim, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, num_classes)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = torch.softmax(self.fc3(x), dim=1)
        return x

def create_model(input_dim, num_classes):
    model = AnimeModel(input_dim, num_classes)
    optimizer = optim.Adam(model.parameters())
    criterion = nn.CrossEntropyLoss()
    return model, optimizer, criterion
