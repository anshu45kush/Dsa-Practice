#include<iostream>
#include<bits/stdc++.h>
using namespace std;
vector<int> twosum(vector<int>&numbers ,int target){
int i=0,sum=0;
int j=numbers.size()-1;
    while(i<j)
{
    sum=numbers[i]+numbers[j];
    if(sum==target){
        return {i,j};
    }
    else if (sum>target){
        j--;
    }
    else{
        i++;
    }
}
return{};
}

int main(){
    int n;int target;
    cout<<"enter the size of array :";
    cin>>n;
    vector<int> numbers(n);
    for (int i = 0; i < n; i++)
    {
        cout<<"enter the element  "<<i<<endl;
        cin>>numbers[i]; 
    }

    cout<<"target no:";
    cin>>target;
    vector<int> result = twosum(numbers,target);
    if(result.empty()){
        cout<<"no numbers found";
    } 
    else{
    for(int i=0; i<result.size();i++){
        cout<<" "<<result[i];
    }
    }


}

