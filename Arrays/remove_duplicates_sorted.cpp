#include <iostream>
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cout << "Enter size of array: ";
    cin >> n;

    vector<int> arr(n);
    cout << "Enter sorted elements:\n";
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    if (n == 0) {
        cout << "New length: 0";
        return 0;
    }

    int slow = 0;  // points to last unique element

    for (int fast = 1; fast < n; fast++) {
        if (arr[fast] != arr[slow]) {
            slow++;
            arr[slow] = arr[fast];
        }
    }

    cout << "New length: " << slow + 1 << endl;
    cout << "Array after removing duplicates:\n";
    for (int i = 0; i <= slow; i++) {
        cout << arr[i] << " ";
    }

    return 0;
}
