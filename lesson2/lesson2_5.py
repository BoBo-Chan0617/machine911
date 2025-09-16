import pandas as pd
from sklearn.datasets import load_iris

import matplotlib.pyplot as plt

# 讀取 IRIS 資料集
iris = load_iris()
df = pd.DataFrame(data=iris.data, columns=iris.feature_names)
df['target'] = iris.target

# 資料分析
print(df.describe())
print("\n各類別數量：")
print(df['target'].value_counts())

# 使用 Matplotlib 檢視分布圖
plt.figure(figsize=(10, 6))
for i, feature in enumerate(iris.feature_names):
    plt.subplot(2, 2, i+1)
    for target in set(iris.target):
        plt.hist(df[df['target'] == target][feature], alpha=0.5, label=iris.target_names[target])
    plt.title(feature)
    plt.xlabel(feature)
    plt.ylabel('Count')
    plt.legend()
plt.tight_layout()
plt.show()